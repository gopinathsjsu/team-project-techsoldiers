/**
 * IOC requirements
 */
import { injectable } from "inversify";
import "reflect-metadata";
/**
 * Interface
 */
import { ILogger } from "@hsmapi/interfaces";
/**
 * ThirdParty Module
 */
import { Logger as tsLogger } from "tslog";

/**
 * @class
 * @classdesc Hotel Management System Logger implementing tslog
 */
@injectable()
export default class HMSLogger implements ILogger {
    logger: tsLogger;
    constructor() {
        this.logger = new tsLogger();
    }
    /**
     * @function Log Info
     * @param message message to be consoled to the lgo
     */
    logInfo(message: string): void {
        this.logger.info("HMS Logger: " + message);
    };
}