
import { HomeController } from '@hsmapi/controllers';
import {  Router } from 'express';
const homeRouter=Router();
homeRouter.get('/',HomeController.getApiStatus);
export default homeRouter;