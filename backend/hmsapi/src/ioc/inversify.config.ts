import { Container } from "inversify";
import { TYPES } from "@hsmapi/ioc/types";
import { ILogger } from '@hsmapi/interfaces';
import { HMSLogger } from '@hsmapi/logging';
const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.Logger).to(HMSLogger);
export { appContainer };