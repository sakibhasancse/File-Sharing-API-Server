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
  let user = process.env.USE_DEMO_USER ? { email: 'me.sakib20@gmail.com', userId: '6236acc0ae3b656f28e334a8' } : false
  if (!user) {
    const validUser = await authenticatedUser(req)
    if (!validUser || validUser && validUser.error) {
      user = {}
    } else user = validUser.data
  }
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
    return next();
  }

  const { details } = result.error;
  const messages = details.map((e) => e.message);
  const msg = messages.join(",");
  // throw new BadRequest(msg);
  return res.status(400).send({ status: "error", message: msg });
};

export const isAuth = async (req, res, next) => {
  try {
    // let auth = req.headers.authorization;
    let user = process.env.USE_DEMO_USER ? true : false
    if (!user) {
        const validUser = await authenticatedUser(req)
        if (!validUser || validUser && validUser.error) {
          res.status(401).send({ error: "Unauthenticated request" });
        } else {
          return next()
        }
    } else {
      return next()
    }
  } catch (error) {
    res.status(401).send({ error: "Unauthenticated request" });
  }

};

const authenticatedUser = async (req) => {
  try {
    let auth = req.headers.authorization;
    if (auth) {
      auth = auth.replace("Bearer ", "");
      return await verifyToken({ auth })
    } else {
      res.status(401).send({ error: "Unauthenticated request" });
    }
  } catch (error) {
    return { error: "Unauthenticated request" }
  }
}



