
import compression from "compression"
import swaggerUI from "swagger-ui-express"
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import xss from 'xss-clean'
import rateLimit from 'express-rate-limit'
import ExpressPinoLogger from "express-pino-logger"
require("dotenv").config();


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
});

const app = express();
app.use(compression());

const logger = ExpressPinoLogger({
  customLogLevel(res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    }
    if (res.statusCode >= 500 || err) {
      return "error";
    }
    if (res.statusCode >= 300 && res.statusCode < 400) {
      return "silent";
    }
    return "info";
  },
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      query: req.query,
      params: req.params,
      headers: {
        "user-agent": req.headers["user-agent"],
        "session-id": req.headers["session-id"] || '',
        host: req.headers.host,
      },
      remoteAddress: req.remoteAddress,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
      header: {
        date: res.headers.date,
        "x-correlation-id": res.headers["x-correlation-id"],
      },
    }),
  },
});

// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Limit request from the same API 
app.use(limiter);

app.use(express.json());
app.use(logger);

const swaggerDocument = require("../api-documentation/swagger.json");

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = app;
