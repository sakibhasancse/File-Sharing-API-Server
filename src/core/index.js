import logger from "./logger"
import EventManager from "./event-manager"
import app from "./app"
import connectWithDb from "./mongo"

const setup = async () => {
  const eventEmitter = new EventManager().getInstance();
  return { app, eventEmitter, connectWithDb, logger };
};

export { setup };
