
import {  Router } from 'express';
import homeRouter from './apihome';
const router=Router();
router.use(homeRouter);
export default router;