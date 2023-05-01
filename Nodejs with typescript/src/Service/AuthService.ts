import {Status} from "../DTO/Status";
import { Request, Response } from "express";

import bcryptjs from "bcryptjs"
import config from "../../config/config";
import signJWT from "../../funtions/signJWT";
import {LoginDTO} from "../DTO/LoginDTO";
import {RegisterDTO} from "../DTO/RegisterDTO";
import AdminRepository from "../repository/AdminRepository";

const adminRepository = new AdminRepository('admin')
export default {
    async login(req: Request, res: Response): Promise<LoginDTO> {
        let name = req.body.username;
        let password = req.body.password;
        let admin = await adminRepository.findByUniqueColumn('admin_name', name);
        let lg: LoginDTO = new LoginDTO(config.message.message.login_error, '', '', 'Flase')
        if(admin === undefined){
            return new Promise(function (resolve, reject) {
                resolve(lg);
            })
        }
        return new Promise(function (resolve, reject) {
            bcryptjs.compare(password, admin.password, (error, _result) => {
                if (!_result) {
                    console.log(error)
                    lg = new LoginDTO(config.message.message.login_error, '', '', 'False')
                    resolve(lg)
                } else {
                    let token = signJWT(name)
                    lg = new LoginDTO(config.message.message.login_successful, token, name, 'OK');
                    resolve(lg)
                }
            });
        })
    },
    async register(req: Request, res: Response): Promise<Status> {
        let name =  req.body.username;
        let password = req.body.password;
        return new Promise(function (resolve, reject) {
            bcryptjs.hash(password, 10, async (err, hash) => {
                let registerDTO: RegisterDTO = new RegisterDTO(name, hash);
                resolve(await adminRepository.createAdmin(registerDTO))
            })
        })
    }
}
