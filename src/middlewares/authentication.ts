import * as express from "express";
import passport from "passport";
import UserModel from "@models/user.model";

interface IPassportStrategyAuthenticator {
  (request: express.Request, response: express.Response, next: (error: any) => void): any;
}

export async function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any> {
  const user: UserModel = await new Promise((resolve, reject) => {
    const strategyAuthentication: IPassportStrategyAuthenticator = passport.authenticate(securityName, {
      session: false,
      assignProperty: "user",
    });
    strategyAuthentication(request, request.res, function next(error: any) {
      if (error) {
        reject(error);
      } else {
        resolve(request.user);
      }
    });
  });
  return user;

  // if (securityName === "apiKey") {
  //   passport.use("apiKey", dummyStrategy);
  //   return passport.authenticate("apiKey");
  // }
}
