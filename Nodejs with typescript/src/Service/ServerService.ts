import { Status } from '../DTO/Status';
import { AdminDTO } from '../DTO/AdminDTO';
import { ServerDTO } from "../DTO/serverDTO";
import ServerRopository from "../repository/ServerRopository";
import {Server} from "../Entitys/Server";
import {NextFunction, Request, Response} from "express";
import {UpdateServerDTO} from "../DTO/UpdateServerDTO";
import {CreateServerDTO} from "../DTO/CreateServerDTO";
import extractJWT from "../middleware/extractJWT";
import AdminRepository from '../repository/AdminRepository';




const serverRepository: ServerRopository = new ServerRopository('server')
const adminRepository: AdminRepository = new AdminRepository('admin')
export default {
    async getAllServer(req: Request, res: Response, next: NextFunction){
        let Servers: Server[] = await serverRepository.findAll()
        let serverDTO: Array<ServerDTO> = new Array();
        for (let rs of Servers) {
            let server = new ServerDTO(rs.id, rs.name, rs.status, rs.isRunSSH, rs.speed, rs.address, "khanh", rs.ram)
            serverDTO.push(server)
        }
        res.status(200).json(serverDTO)
    },

    async getDetailServer(req: Request, res: Response, next: NextFunction){
        try {
            let id: number = +req.params.id;
            let sv: Server = await serverRepository.findByUniqueColumn('id', id)
            let admin: AdminDTO = await adminRepository.findByUniqueColumn('id', sv.adminId)
            let serverDTo = new ServerDTO(sv.id, sv.name, sv.status, sv.isRunSSH, sv.speed, sv.address, admin.admin_name, sv.ram)
            res.status(200).json(serverDTo)
        }catch (e){
            res.status(400).json(new Status('server error', 'False', ''));
        }
    },

    async updateServer(req: Request, res: Response, next: NextFunction){
        let id: number = req.body.id;
        let name = req.body.name;
        let address = req.body.address;
        let updateServerDTO: UpdateServerDTO = new UpdateServerDTO(name, address, id);
        let status = await serverRepository.updateServer(updateServerDTO).catch(error => {
            console.log(error)
            if(error.code === 'ER_BAD_NULL_ERROR'){
                res.status(400).json(new Status('Nhập đầy đủ thông tin', 'False', ''));
            }else if(error.code === 'ER_DUP_ENTRY'){
                res.status(400).json(new Status('Trùng tên server hoặc địa chỉ', 'False', ''));
            }else{
                res.status(501).json(new Status('server error', 'False', ''));
            }
        })
        res.status(200).json(status);
    },
    async createServer(req: Request, res: Response, next: NextFunction) {
        let name = req.body.name;
        let password = req.body.password;
        let address = req.body.address;
        let username: AdminDTO = await extractJWT.GetUserFromRequest(req, res)
        let createServerDTO = new CreateServerDTO(name, address, password, username);
        let status = await serverRepository.createServer(createServerDTO).catch(error => {
            console.log(error)
            if(error.code === 'ER_BAD_NULL_ERROR'){
                res.status(400).json(new Status('Nhập đầy đủ thông tin', 'False', ''));
            }else if(error.code === 'ER_DUP_ENTRY'){
                res.status(400).json(new Status('Trùng tên server hoặc địa chỉ', 'False', ''));
            }else{
                res.status(501).json(new Status('server error', 'False', ''));
            }
            next()
        })
        res.status(200).json(status);
    },
    async deleteServer(req: Request, res: Response, next: NextFunction){
        let id: number = +req.params.id;
        let status = await serverRepository.delete('id', id).catch(error => {
            console.log(error)
                res.status(501).json(new Status('server error', 'False', ''));
            }
        );
        res.status(200).json(status);
    },
    async findServerByKey(req: Request, res: Response, next: NextFunction): Promise<ServerDTO[]> {
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
