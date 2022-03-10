import app from '@hsmapi/app';
import { ILogger } from '@hsmapi/Interfaces';
import { appContainer } from '@hsmapi/ioc/inversify.config';
import { TYPES } from '@hsmapi/ioc/types';
const logger=appContainer.get<ILogger>(TYPES.Logger);
app.listen(3030,()=>{
    logger.logInfo('server started');
})