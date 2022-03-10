import {ILogger} from "./../Interfaces";
import { Logger as tsLogger } from "tslog";
import { injectable } from "inversify";
import "reflect-metadata";
@injectable()
export default class HMSLogger implements ILogger{
    logger: tsLogger;
    constructor(){
        this.logger=new tsLogger();
    }
    logInfo(message: string)  : void {
        this.logger.info("HMS Logger: "+message);
    };
}