import { Request, Response } from "express";
import ServerService from "../models/Service/ServerService";

    
const getAllServer = async (req: Request, res: Response) => {
        let servers = await ServerService.getAllServer();
        res.json(servers);
}

const getDetailServer = async (req: Request, res: Response) => {
        let server = await ServerService.getDetailServer(req, res);
        res.json(server);
}

const updateServer = async (req: Request, res: Response) => {
        let server = await ServerService.updateServer(req, res);
        res.json(server)
}

const createServer = async (req: Request, res: Response) => {
        let server = await ServerService.createServer(req, res)
        res.json(server)
}

const deleteServer = async (req: Request, res: Response) => {
        let server = await ServerService.deleteServer(req, res)
        res.json(server)
}

const findServerByKey = async (req: Request, res: Response) => {
        let server = await ServerService.findServerByKey(req, res)
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
