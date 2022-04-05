import { setup } from "./core";
import { handleError } from "./common/middlewares";
import dotenv from 'dotenv';
dotenv.config()

const start = async () => {
  try {
    const { app, eventEmitter, dbConnection, logger } = await setup();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, async () => {
        logger.info(`Server listen on http://localhost:${PORT}`);

        const broadcastDatabaseConnectionEstablished = (em) => {
          em.emit("databaseConnected");
        };

        eventEmitter.on("databaseConnected", () => {
          logger.info(
            "Database Connected"
          );
        });

        await dbConnection(broadcastDatabaseConnectionEstablished, eventEmitter);
        logger.info(`Database connected at ${new Date()}`);
      });

  } catch (err) {
    console.error({ err });
    handleError(err);
  }
};

start()