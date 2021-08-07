"use strict";
import Server from "./server";
import { container } from "tsyringe";
import "@configs/general";
import "@state";
import Logger from "@configs/logger";

export const start = async (): Promise<void> => {
  Logger.info("Starting server...");
  Logger.info("Creating ApiServer");

  const server = container.resolve(Server);

  await server.start();

  const graceful = () => {
    Logger.info("Stopping server");
    server.stop().then(() => process.exit(0));
  };
  // Stop graceful
  process.on("SIGTERM", graceful);
  process.on("SIGINT", graceful);
};
