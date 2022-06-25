import { ServerDTO } from "../DTO/serverDTO";
import ServerRopository from "../repository/ServerRopository";
import {Server} from "../Entitys/Server";
import { Request, Response } from "express";
import {Status} from "../DTO/Status";
import {UpdateServerDTO} from "../DTO/UpdateServerDTO";
import {CreateServerDTO} from "../DTO/CreateServerDTO";
import extractJWT from "../../middleware/extractJWT";

export default {
    async getAllServer(): Promise<Array<ServerDTO>> {
        let Servers: Array<Server> = await ServerRopository.findAll('server');
        console.log(Servers)
        let serverDTO: Array<ServerDTO> = new Array();
        return new Promise(function (resolve, reject) {
            for (let rs of Servers) {
                let server = new ServerDTO(rs.id, rs.name, rs.status, rs.isRunSSH, rs.speed, rs.address, rs.adminID)
                serverDTO.push(server)
            }
            resolve(serverDTO)
        })
    },

    async getDetailServer(req: Request, res: Response): Promise<ServerDTO> {
        let id: number = +req.params.id;
        let sv: Server = await ServerRopository.findByUniqueColumn('server', 'id', id);
        return new Promise(function (resolve, reject) {
            let serverDTo = new ServerDTO(sv.id, sv.name, sv.status, sv.isRunSSH, sv.speed, sv.address, sv.adminID)
            resolve(serverDTo)
        })
    },

    async updateServer(req: Request, res: Response): Promise<Status> {
        let id = req.body.id;
        let name = req.body.name;
        let address = req.body.address;
        let updateServerDTO: UpdateServerDTO = new UpdateServerDTO(name, address, id);
        return await ServerRopository.updateServer(updateServerDTO);
    },
    async createServer(req: Request, res: Response): Promise<Status> {
        console.log(req.body)
        let name = req.body.name;
        let password = req.body.password;
        let address = req.body.address;
        let createServerDTO = new CreateServerDTO(name, address, password);
        return await ServerRopository.createServer(createServerDTO);
    },
    async deleteServer(req: Request, res: Response): Promise<Status> {
        let id: number = +req.params.id;
        return await ServerRopository.delete('server', 'id', id);
    },
    async findServerByKey(req: Request, res: Response): Promise<ServerDTO[]> {
        let key = String(req.query.key);
        let serverDTOs: Array<ServerDTO> = await ServerRopository.findServerByKey(key);
        return serverDTOs;
    }
}
