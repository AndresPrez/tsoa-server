import express from "express";
import { Strategy as CustomStrategy } from "passport-custom";
// import { Strategy as JwtStrategy } from "passport-jwt";
import configs from "src/configs/general";
import UserModel, { UserRoles } from "src/models/user.model";

const dummyStrategy = new CustomStrategy(async (req: express.Request, verified) => {
  const dummyUser = await findUser();
  let error;
  verified(error, dummyUser);
});

const apiKeyStrategy = new CustomStrategy(async (req: express.Request, verified) => {
  validateApiKey(req);
  const dummyUser = await findUser();
  let error;
  verified(error, dummyUser);
});

const findUser = async (): Promise<UserModel> => {
  const dummyUser: UserModel = {
    userId: "dummyId",
    name: "dummyUser",
    role: UserRoles.USER,
  };
  return dummyUser;
};

const validateApiKey = (req: express.Request): express.Request => {
  if (req.headers["x-api-key"] !== configs.apiKey) {
    throw new Error("Invalid License Key");
  } else {
    return req;
  }
};

export default { dummy: dummyStrategy, apiKey: apiKeyStrategy };
