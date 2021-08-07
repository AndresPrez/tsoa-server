import moment from "moment";
import { singleton } from "tsyringe";
import { state } from "@state/index";

@singleton()
class StatusService {
  status() {
    const startTime = moment().from(state.startTime, true);
    return `Server is operational since ${startTime} [${state.startTime}]`;
  }
}

export default new StatusService();
