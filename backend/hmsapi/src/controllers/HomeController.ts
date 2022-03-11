import { NextFunction, Request,Response } from "express";

class HomeController{
        getApiStatus(req:Request,res:Response,next:NextFunction){
                return res.json({
                    "name":"HMS API 0.1"
                });
        }
}
export default new HomeController();