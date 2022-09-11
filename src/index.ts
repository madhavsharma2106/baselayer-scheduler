import { config, logger } from "./config";
const Logger = logger("src/index.ts");
import { app } from "./app";
import { db } from "./config/db";

app.listen(config.port, async () => {
  try {
    await db.connect();
    Logger("app.listen").info("Conencted to Db");
    Logger("app.listen").info(
      `Server running in ${config.env} enviroment on Port ${config.port}`
    );
  } catch (error) {
    Logger("app.listen").error("Unable to connect to the database:", error);
  }
});

const exitHandler = () => {
  process.exit(1);
};

const unexpectedErrorHandler = (error) => {
  Logger("unexpectedErrorHandler").error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  Logger("SIGTERM").info("SIGTERM received");
});
