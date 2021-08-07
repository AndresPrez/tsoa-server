import { singleton } from "tsyringe";
import moment from "moment";

@singleton()
class ServerState {
  public readonly startTime: moment.Moment;

  constructor() {
    this.startTime = moment();
  }

  get upTime(): moment.Duration {
    return moment.duration(moment().diff(this.startTime));
  }
}

export const state = new ServerState();
