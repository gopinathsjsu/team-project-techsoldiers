import { Response } from "express";
import HomeController from "../HomeController";

let homeController:HomeController;
describe('Home Api',()=>{
    beforeEach(() => {
        homeController=new HomeController();
      });
      const mockResponse = () => {
        const res = {} as Response;
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };
      test ("Should show status of the api", async () => {
        const res = mockResponse();
        await homeController.getApiStatus(null, res,null);
        expect(res.json).toHaveBeenCalledWith({"name":"HMS API 0.1"});
      })
});