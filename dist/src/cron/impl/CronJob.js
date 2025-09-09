"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronJob = void 0;
const cron_1 = require("cron");
class CronJob {
    constructor(props) {
        this.cron = new cron_1.CronJob(props);
    }
    start() {
        this.cron.start();
    }
    ;
    stop() {
        this.cron.stop();
    }
    ;
}
exports.CronJob = CronJob;
//# sourceMappingURL=CronJob.js.map