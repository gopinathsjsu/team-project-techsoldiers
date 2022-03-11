
import { HomeController } from '@hsmapi/controllers';
import {  Router } from 'express';
const homeController=new HomeController();
const homeRouter=Router();
homeRouter.get('/',homeController.getApiStatus);
export default homeRouter;