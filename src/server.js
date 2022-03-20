import { setup } from "./core"
import { init } from "./modules"
import { handleError, handleRequest } from "./common/middlewares"
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const start = async () => {
  const initModules = async (app) => {
    const appHandle = await init(app);
    return appHandle;
  };

  const configureRoutes = async (app) => {
    app.use(handleRequest);
    const appHandle = await initModules(app);
    appHandle.use(handleError);
    return appHandle;
  };

  const { app, eventEmitter, connectWithDb, logger } = await setup();

  try {
    await configureRoutes(app);
    app.listen(PORT, async () => {
      logger.info(`Server started on http://localhost:${PORT}`);

      const broadcastDatabaseConnectionEstablished = (em) => {
        em.emit("databaseConnectionEstablished");
      };

      eventEmitter.on("databaseConnectionEstablished", () => {
        logger.info(
          "Database connection established"
        );
      });

      await connectWithDb(broadcastDatabaseConnectionEstablished, eventEmitter);
      logger.info(`Database connection established at ${new Date()}`);
    });
  } catch (err) {
    handleError(err);
  }
};

start();
