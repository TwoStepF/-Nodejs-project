import { Request, Response } from "express";
import ServerService from "../models/Service/ServerService";
    
const getAllServer = (req: Request, res: Response) => {
        ServerService.getAllServer();
}

const getDetailServer = (req: Request, res: Response) => {
        ServerService.getDetailServer(req, res);
}

const updateServer = (req: Request, res: Response) => {
        ServerService.updateServer(req, res);
}

const createServer = (req: Request, res: Response) => {
        ServerService.createServer(req, res)
}

const deleteServer = (req: Request, res: Response) => {
        ServerService.deleteServer(req, res)
}

const findServerByKey = (req: Request, res: Response) => {
        ServerService.findServerByKey(req, res)
}

export default {
        getAllServer,
        getDetailServer,
        updateServer,
        createServer,
        deleteServer,
        findServerByKey
}
