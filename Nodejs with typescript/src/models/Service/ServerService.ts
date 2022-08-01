import { Status } from './../DTO/Status';
import { AdminDTO } from './../DTO/AdminDTO';
import { ServerDTO } from "../DTO/serverDTO";
import ServerRopository from "../repository/ServerRopository";
import {Server} from "../Entitys/Server";
import { Request, Response } from "express";
import {UpdateServerDTO} from "../DTO/UpdateServerDTO";
import {CreateServerDTO} from "../DTO/CreateServerDTO";
import extractJWT from "../../middleware/extractJWT";
import AdminRepository from '../repository/AdminRepository';

const serverRepository: ServerRopository = new ServerRopository('server')
const adminRepository: AdminRepository = new AdminRepository('admin')
export default {
    async getAllServer(): Promise<Array<ServerDTO>> {
        let Servers: Array<Server> = await serverRepository.findAll();

        let serverDTO: Array<ServerDTO> = new Array();
        return new Promise(async function (resolve, reject) {
            for (let rs of Servers) {
                console.log(rs.adminId)
                let admin: AdminDTO = await adminRepository.findByUniqueColumn('id', rs.adminId)
                let server = new ServerDTO(rs.id, rs.name, rs.status, rs.isRunSSH, rs.speed, rs.address, admin.admin_name, rs.ram)
                serverDTO.push(server)
            }
            resolve(serverDTO)
        })
    },

    async getDetailServer(req: Request, res: Response): Promise<ServerDTO> {
        let id: number = +req.params.id;
        let sv: Server = await serverRepository.findByUniqueColumn('id', id);
        return new Promise(async function (resolve, reject) {
            let admin: AdminDTO = await adminRepository.findByUniqueColumn('id', sv.adminId)
            let serverDTo = new ServerDTO(sv.id, sv.name, sv.status, sv.isRunSSH, sv.speed, sv.address, admin.admin_name, sv.ram)
            resolve(serverDTo)
        })
    },

    async updateServer(req: Request, res: Response): Promise<Status> {
        let id = req.body.id;
        let name = req.body.name;
        let address = req.body.address;
        let updateServerDTO: UpdateServerDTO = new UpdateServerDTO(name, address, id);
        return await serverRepository.updateServer(updateServerDTO);
    },
    async createServer(req: Request, res: Response): Promise<Status> {
        let name = req.body.name;
        let password = req.body.password;
        let address = req.body.address;
        let username: AdminDTO = await extractJWT.GetNameFromRequest(req, res)
        let createServerDTO = new CreateServerDTO(name, address, password, username);
        return await serverRepository.createServer(createServerDTO);
    },
    async deleteServer(req: Request, res: Response): Promise<Status> {
        let id: number = +req.params.id;
        return await serverRepository.delete('id', id);
    },
    async findServerByKey(req: Request, res: Response): Promise<ServerDTO[]> {
        let key = String(req.query.key);
        let name = String(req.query.name);
        let status: any = req.query.status;
        let type = String(req.query.type);
        let order = String(req.query.order);
        let id, idColumn
        let serverDTO: Array<ServerDTO> = new Array();
        if(key===''){
            return serverDTO
        }if(key === 'null'){
            key = ''
        }if(name === 'null'){
            id = 1
            idColumn = 1
        }else{
            let admin = await adminRepository.findByUniqueColumn('admin_name', name)
            id = admin.id
            idColumn = 'adminId'
        }
        if(req.query.status === 'false'){
            status = 0;
        }
        if(req.query.status === 'true'){
            status = 1;
        }
        if(type === 'null'){
            type = 'id'
        }
        if(order === 'null'){
            order = ''
        }
        let Servers: Array<Server> = await serverRepository.filterServer(key, idColumn, id , status, type, order);
        return new Promise(async function (resolve, reject) {
            for (let rs of Servers) {
                let admin: AdminDTO = await adminRepository.findByUniqueColumn('id', rs.adminId)
                let server = new ServerDTO(rs.id, rs.name, rs.status, rs.isRunSSH, rs.speed, rs.address, admin.admin_name, rs.ram)
                serverDTO.push(server)
            }
            resolve(serverDTO)
        })
    }
}
