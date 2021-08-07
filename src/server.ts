import express, { Request, Response } from "express";
import { autoInjectable, singleton } from "tsyringe";
import swaggerUi from "swagger-ui-express";
import passport from "passport";
import * as http from "http";
import cors from "cors";
import morgan from "morgan";
import configs from "src/configs/general";
import strategies from "@configs/auth";
import Logger from "@configs/logger";
import { errorHandler } from "src/middlewares/error";
import { RegisterRoutes } from "@routes/routes";
import { Strategy } from "passport-strategy";
import swaggerJson from "src/swagger.json";

@singleton()
@autoInjectable()
class Server {
  private readonly app: express.Application;
  private server: http.Server;

  constructor() {
    this.app = express();

    this.app.use(morgan("combined"));
    this.app.use(cors());

    // express.json uses the 'body-parser' package.
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.registerAuthenticator(strategies);

    // Registers API endpoints.
    RegisterRoutes(this.app);

    // Register a Swagger Doc endpoint.
    // Serve a public Swagger CSS styles: https://github.com/Amoenus/SwaggerDark
    this.app.get("/docs/swagger.css", (req, res) => {
      res.sendFile("./styles/swagger.css", { root: __dirname });
    });
    this.app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerJson, { customCssUrl: "/docs/swagger.css" })
      // swaggerUi.setup(swaggerJson, { customCssUrl: "https://raw.githubusercontent.com/Amoenus/SwaggerDark/master/SwaggerDark.css" })
    );

    this.app.use(errorHandler);
  }

  private registerAuthenticator(strategies: { [key: string]: Strategy }): void {
    Object.keys(strategies).forEach((strategy: string) => passport.use(strategy, strategies[strategy]));
  }

  public start(): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      this.server = this.app
        .listen(configs.port, () => {
          Logger.info(`Listening to ${configs.host.scheme}://${configs.host.name}:${configs.port}/`);
          return resolve();
        })
        .on("error", (error: any) => {
          if (error) {
            return reject(error);
          }
        });
    });
  }

  public stop(): Promise<boolean> {
    return new Promise<boolean>((resolve, _reject) => {
      if (this.server) {
        this.server.close(() => {
          return resolve(true);
        });
      } else {
        return resolve(true);
      }
    });
  }
}

export default Server;
