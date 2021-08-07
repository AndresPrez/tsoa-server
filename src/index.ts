"use strict";
import "reflect-metadata"
import 'module-alias/register';
import { start } from "./start";
import dotenv from "dotenv";
import fse from "fs-extra";
import Logger from "@configs/logger";

const envFilePath = "./.env";

if (fse.existsSync(envFilePath)) {
  Logger.info(`Loading environment variables from ${envFilePath}`);
  dotenv.config({ path: envFilePath });
} else {
  Logger.info(`${envFilePath} not found! Not loading any environment variables from file`);
}

start().catch((err: any) => {
  Logger.error(`Error starting server: ${err.message}`);
  process.exit(-1);
});
