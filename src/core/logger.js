const winston = require("winston");
const pinoLogger = require("pino")();

const alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.label({
    label: "[LOGGER]",
  }),
  winston.format.printf(
    (info) => ` ${info.label}-[${info.level}] : ${info.message}`
  )
);

const winstonLogger = winston.createLogger({
  level: "debug",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        alignColorsAndTime
      ),
    }),
  ],
});


const logOption = process.env.LOGGER_NAME || "winston";

if (logOption === "pino") module.exports = pinoLogger;
else module.exports = winstonLogger;
