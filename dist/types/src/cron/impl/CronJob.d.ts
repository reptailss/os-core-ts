/// <reference types="node" />
import { ICronJob } from "..";
import { DateTime } from 'luxon';
import { SpawnOptions } from 'child_process';
type CronCommand = (() => void) | string | {
    command: string;
    args?: ReadonlyArray<string> | undefined;
    options?: SpawnOptions | undefined;
};
export declare class CronJob implements ICronJob {
    private cron;
    constructor(props: {
        /**
         * The time to fire off your job. This can be in the form of cron syntax, a JS ```Date``` object, or a luxon ```DateTime``` object.
         */
        cronTime: string | Date | DateTime;
        /**
         * The function to fire at the specified time. If an ```onComplete``` callback was provided, ```onTick``` will receive it as an argument. ```onTick``` may call ```onComplete``` when it has finished its work.
         */
        onTick: CronCommand;
        /**
         * A function that will fire when the job is stopped with ```job.stop()```, and may also be called by ```onTick``` at the end of each run.
         */
        onComplete?: CronCommand | null | undefined;
        /**
         * Specifies whether to start the job just before exiting the constructor. By default this is set to false. If left at default you will need to call ```job.start()``` in order to start the job (assuming ```job``` is the variable you set the cronjob to). This does not immediately fire your ```onTick``` function, it just gives you more control over the behavior of your jobs.
         */
        start?: boolean | undefined;
        /**
         * Specify the timezone for the execution. This will modify the actual time relative to your timezone. If the timezone is invalid, an error is thrown. Can be any string accepted by luxon's ```DateTime.setZone()``` (https://moment.github.io/luxon/api-docs/index.html#datetimesetzone). Probably don't use both ```timeZone``` and ```utcOffset``` together or weird things may happen.
         */
        timeZone?: string | undefined;
        /**
         * The context within which to execute the onTick method. This defaults to the cronjob itself allowing you to call ```this.stop()```. However, if you change this you'll have access to the functions and values within your context object.
         */
        context?: any;
        /**
         * This will immediately fire your ```onTick``` function as soon as the requisit initialization has happened. This option is set to ```false``` by default for backwards compatibility.
         */
        runOnInit?: boolean | undefined;
        /**
         * This allows you to specify the offset of your timezone rather than using the ```timeZone``` param. Probably don't use both ```timeZone``` and ```utcOffset``` together or weird things may happen.
         */
        utcOffset?: string | number | undefined;
        /**
         * If you have code that keeps the event loop running and want to stop the node process when that finishes regardless of the state of your cronjob, you can do so making use of this parameter. This is off by default and cron will run as if it needs to control the event loop. For more information take a look at [timers#timers_timeout_unref](https://nodejs.org/api/timers.html#timers_timeout_unref) from the NodeJS docs.
         */
        unrefTimeout?: boolean | undefined;
    });
    start(): void;
    stop(): void;
}
export {};
