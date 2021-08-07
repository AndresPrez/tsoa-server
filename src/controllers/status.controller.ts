import express from "express";
import { singleton } from "tsyringe";
import { Controller, Get, Route, Request, Security } from "tsoa";
import StatusService from "@services/status.service";
import UserModel from "@models/user.model";

@Route("status")
@Security("dummy")
@singleton()
export class StatusController extends Controller {
  @Get("")
  public getServerStatus(@Request() request: express.Request) {
    const user: UserModel = request.user;
    const status = StatusService.status();
    return `Hello ${user.name}. ${status}`;
  }
}

// import { singleton } from "tsyringe";
// import { Controller, Get, Route } from "tsoa";
// import StatusService from "@services/status.service";

// @Route("status")
// @singleton()
// export class StatusController extends Controller {
//   @Get("")
//   public getServerStatus() {
//     const status = StatusService.status();
//     return status;
//   }
// }
