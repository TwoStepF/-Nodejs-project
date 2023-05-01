import { Request, Response, NextFunction } from "express";
import ServerService from "../Service/ServerService";

    
const getAllServer = async (req: Request, res: Response, next: NextFunction) => {
        await ServerService.getAllServer(req, res, next);
}

const getDetailServer = async (req: Request, res: Response, next: NextFunction) => {
       await ServerService.getDetailServer(req, res, next);
}

const updateServer = async (req: Request, res: Response, next: NextFunction) => {
        await ServerService.updateServer(req, res, next);
}

const createServer = async (req: Request, res: Response, next: NextFunction) => {
        await ServerService.createServer(req, res, next)
}

const deleteServer = async (req: Request, res: Response, next: NextFunction) => {
        await ServerService.deleteServer(req, res, next)
}

const findServerByKey = async (req: Request, res: Response, next: NextFunction) => {
        let server = await ServerService.findServerByKey(req, res, next)
        res.json(server)
}

export default {
        getAllServer,
        getDetailServer,
        updateServer,
        createServer,
        deleteServer,
        findServerByKey
}
