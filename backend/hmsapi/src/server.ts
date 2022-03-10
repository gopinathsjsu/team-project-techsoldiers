import app from './app';
import { ILogger } from './Interfaces';
import { appContainer } from './ioc/inversify.config';
import { TYPES } from './ioc/types';
const logger=appContainer.get<ILogger>(TYPES.Logger);
app.listen(3030,()=>{
    logger.logInfo('server started');
})