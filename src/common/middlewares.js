import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { GeneralError, BadRequest } from "./errors";

export const handleError = async (err, req, res, next) => {
  if (!res) {
    console.log(err.message)
    return

  }
  if (res && res.headersSent) {
    return next(err);
  }

  let code = 500;
  if (err instanceof GeneralError) {
    code = err.getCode();
  }
  const correlationId = req.headers["x-correlation-id"];
  req.log.error(err, { correlationId });
  return (
    res &&
    res.status(code).send({
      correlationId,
      message: err.message,
      status: "error",
      error: { ...err },
    })
  );
};

export const handleRequest = async (req, res, next) => {
  let correlationId = req.headers["x-correlation-id"];
  if (!correlationId) {
    correlationId = v4();
    req.headers["x-correlation-id"] = correlationId;
  }
  let user = { email: 'sakib', userId: '6236acc0ae3b656f28e334a8' };

  req.user = user;
  res.set("x-correlation-id", correlationId);
  req.log = req.log.child({ correlationId });
  req.log.info(`new request: ${req.method} ${req.url}`);
  return next();
};

export const handleValidation = (validate) => (req, res, next) => {
  const result = validate(req.body);
  const isValid = result.error == null;
  if (isValid) {
    req.body = result.value;
    return next();
  }

  const { details } = result.error;
  const messages = details.map((e) => e.message);
  const msg = messages.join(",");
  // throw new BadRequest(msg);
  return res.status(400).send({ status: "error", message: msg });
};

export const authenticateRequest = async (req, res, next) => {
  let auth = req.headers.authorization;
  if (auth) {
    auth = auth.replace("Bearer ", "");
    jwt.verify(auth, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        const { stack, name, ...errorProps } = err;
        req.log.error({ ...errorProps, name }, "jwt token invalid");
        res.status(401).send({
          success: false,
          // error: err.message || 'Invalid token',
          // data: '401 Unauthorized',
          // message: 'Invalid token',
          errorMessage: err.message || "Invalid token",
        });
      } else {
        req.user = decoded;
        req.log = req.log.child({ username: req.user.username });
        req.log.info(`Authenticated user ${req.user.username}`);
        next();
      }
    });
  } else {
    res.status(401).send({ error: "Unauthenticated request" });
  }
};

