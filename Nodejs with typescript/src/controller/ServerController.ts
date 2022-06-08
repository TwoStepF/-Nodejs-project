import { Request, Response } from "express";
import ServerRepository from "../repository/ServerRopository";
    
const getAllServer = (req: Request, res: Response) => {
        ServerRepository.querygetAllServer(req, res);
}

const getDetailServer = (req: Request, res: Response) => {
        ServerRepository.querygetDetailServer(req, res);
}

const updateServer = (req: Request, res: Response) => {
        ServerRepository.queryUpdateServer(req, res);
}

const createServer = (req: Request, res: Response) => {
        ServerRepository.queryCreateServer(req, res)
}

const deleteServer = (req: Request, res: Response) => {
        ServerRepository.queryDeleteServer(req, res)
}

export default {
        getAllServer,
        getDetailServer,
        updateServer,
        createServer,
        deleteServer
}