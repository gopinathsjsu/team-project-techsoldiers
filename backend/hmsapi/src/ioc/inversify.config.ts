import { Container } from "inversify";
import { TYPES } from "./types";
import { ILogger } from "./../Interfaces";
import {HMSLogger} from "./../Logging";
const appContainer=new Container();
appContainer.bind<ILogger>(TYPES.Logger).to(HMSLogger);
export {appContainer};