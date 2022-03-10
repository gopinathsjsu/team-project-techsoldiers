import { Container } from "inversify";
import { TYPES } from "@hsmapi/ioc/types";
import { ILogger } from '@hsmapi/Interfaces';
import { HMSLogger } from '@hsmapi/Logging';
const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.Logger).to(HMSLogger);
export { appContainer };