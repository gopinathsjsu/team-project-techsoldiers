import createApp from '@hsmapi/app';
import { ILogger } from '@hsmapi/interfaces';
import { appContainer } from '@hsmapi/ioc/inversify.config';
import { TYPES } from '@hsmapi/ioc/types';
const logger=appContainer.get<ILogger>(TYPES.Logger);
createApp().listen(3030,()=>{
    logger.logInfo('server started');
});