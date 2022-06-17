import { ServerDTO } from "../DTO/serverDTO";
import ServerRopository from "../repository/ServerRopository";
import {Server} from "../Entitys/Server";
import { Request, Response } from "express";
import {Status} from "../DTO/Status";
import {UpdateServerDTO} from "../DTO/UpdateServerDTO";
import {CreateServerDTO} from "../DTO/CreateServerDTO";

export default {
    getAllServer(): Array<ServerDTO>{
        let Servers: Array<Server> = ServerRopository.findAll();
        let serverDTO: Array<ServerDTO> = new Array();
        for(let rs of Servers){
            let server = new ServerDTO(rs.id, rs.name, rs.status, rs.isRunSSH, rs.speed, rs.address, rs.adminID)
            serverDTO.push(server)
        }
        return serverDTO;
    },

    getDetailServer(req: Request, res: Response): ServerDTO {
        let id: number = +req.params.id;
        let sv: Server = ServerRopository.findServerByUniqueColumn('id', id);
        let serverDTo = new ServerDTO(sv.id, sv.name, sv.status, sv.isRunSSH, sv.speed, sv.address, sv.adminID)
        return serverDTo;
    },

    updateServer(req: Request, res: Response): Status {
        let id = req.body.id;
        let name = req.body.name;
        let address =  req.body.address;
        let updateServerDTO: UpdateServerDTO = new UpdateServerDTO(name, address, id);
        return ServerRopository.updateServer(updateServerDTO);
    },
    createServer(req: Request, res: Response): Status {
        let name = req.body.name;
        let password = req.body.password;
        let address =  req.body.address;
        let createServerDTO = new CreateServerDTO(name, password, address);
        return ServerRopository.createServer(createServerDTO);
    },
    deleteServer(req: Request, res: Response): Status {
        let id: number = +req.params.id;
        return ServerRopository.deleteServer(id);
    },
    findServerByKey(req: Request, res: Response): Array<ServerDTO> {
        let key = String(req.query.key);
        let serverDTOs: Array<ServerDTO> = ServerRopository.findServerByKey(key);
        return serverDTOs;
    }
}
