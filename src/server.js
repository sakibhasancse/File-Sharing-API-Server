import { setup } from "./core";
import appModules from "./modules";
import { handleError, handleRequest } from "./common/middlewares";
import dotenv from 'dotenv';
import express from 'express'
dotenv.config()

const PORT = process.env.PORT || 5000;

const start = async () => {
  const initModules = async (app) => {
    const appHandle = await appModules(app);
    return appHandle;
  };

  const configureRoutes = async (app) => {
    app.use(handleRequest);

    const appHandle = await initModules(app);
    appHandle.use(handleError);
    return appHandle;
  };

  const { app, eventEmitter, dbConnection, logger } = await setup();

  try {
    if (process.env.NODE_ENV === 'test') {
      var testApp = express()
      await configureRoutes(testApp);
      console.log('caling')
      return testApp;
    } else {
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

        await dbConnection(broadcastDatabaseConnectionEstablished, eventEmitter);
        logger.info(`Database connection established at ${new Date()}`);
      });
    }

  } catch (err) {
    console.error({ err });
    handleError(err);
  }
};

export default start