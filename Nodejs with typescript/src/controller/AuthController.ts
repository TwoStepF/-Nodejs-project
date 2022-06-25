import { Request, Response } from "express";
import AuthService from "../models/Service/AuthService";

export default {
    async register(req: Request, res: Response){
        let register = await AuthService.register(req, res);
        res.json(register)
    },
    async login(req: Request, res: Response) {
        let login = await AuthService.login(req, res);
        res.json(login)
    }
}
