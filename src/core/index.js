import logger from "./logger"
import eventEmitter from "./event-manager"
import app from "./app"
import connectWithDb from "./mongo"

const setup = async () => {
  eventEmitter.getInstance();
  return { app, eventEmitter, connectWithDb, logger };
};

module.exports = { setup };
