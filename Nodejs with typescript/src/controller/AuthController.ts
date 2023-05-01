import { Request, Response } from "express";
import AuthService from "../Service/AuthService";

export default {
    async register(req: Request, res: Response){
        await AuthService.register(req, res);
    },
    async login(req: Request, res: Response) {
        await AuthService.login(req, res);
    },
    async refreshToken(req: Request, res: Response){
        await AuthService.refreshToken(req, res);
    }
}
