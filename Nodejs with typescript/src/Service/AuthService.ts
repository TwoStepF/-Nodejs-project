import {Status} from "../DTO/Status";
import { Request, Response } from "express";

import bcryptjs from "bcryptjs"
import config from "../config/config";
import signJWT from "../funtions/signJWT";
import {LoginDTO} from "../DTO/LoginDTO";
import {RegisterDTO} from "../DTO/RegisterDTO";
import AdminRepository from "../repository/AdminRepository";
import TokenRepository from "../repository/TokenRepository";
import {AdminDTO} from "../DTO/AdminDTO";
import extractJWT from "../middleware/extractJWT";

const adminRepository = new AdminRepository('admin')
const tokenRepository = new TokenRepository("rftoken")
export default {
    async login(req: Request, res: Response){
        let name = req.body.username;
        let password = req.body.password;
        let admin = await adminRepository.findByUniqueColumn('admin_name', name);
        if(admin === undefined){
            res.status(400).json(new Status('username hoặc password không chính xác', 'False', ''))
        }else{
            bcryptjs.compare(password, admin.password, async (error, _result) => {
                if (error) {
                    console.log(error)
                    res.status(500).json(new LoginDTO(config.message.message.login_error, '', '', '', 'False'))
                } else if (!_result) {
                    res.status(400).json(new LoginDTO("Sai tài khoản hoặc mật khẩu", '', '', '', 'False'))
                } else {
                    let token = signJWT(name, 'token')
                    let rfToken = await tokenRepository.findByUniqueColumn('usernmae', name)
                    if(!rfToken){
                        rfToken = signJWT(name, 'refreshToken')
                        await tokenRepository.createToken(rfToken, name).catch(error => {
                            console.log(error)
                            res.status(501).json(new Status('server error', 'False', ''));
                        })
                    }
                    res.status(200).json(new LoginDTO(config.message.message.login_successful, token, rfToken.rftoken, name, 'OK'));
                }
            });
        }
    },
    async register(req: Request, res: Response) {
        let name =  req.body.username;
        let password = req.body.password;
        bcryptjs.hash(password, 10, async (err, hash) => {
            let registerDTO: RegisterDTO = new RegisterDTO(name, hash);
            let status = await adminRepository.createAdmin(registerDTO).catch(error => {
                if(error.code === 'ER_BAD_NULL_ERROR'){
                    res.status(400).json(new Status('Nhập đầy đủ thông tin', 'False', ''));
                }else if(error.code === 'ER_DUP_ENTRY'){
                    res.status(400).json(new Status('Trùng username', 'False', ''));
                }else{
                    res.status(501).json(new Status('server error', 'False', ''));
                }
            })
            res.status(200).json(status)
        })
    },
    async refreshToken(req: Request, res: Response){
        try {
            let refreshtoken = req.body.refreshtoken;
            let username = await extractJWT.GetUserFromToken(refreshtoken)
            console.log('refresh token for user: ' + username.admin_name)
            let rfToken = await tokenRepository.findByUniqueColumn('usernmae', username.admin_name)
            if(rfToken.rftoken === refreshtoken){
                let token = signJWT(username.admin_name, 'token')
                res.status(200).json(new Status('thành công', 'OK', token))
            }else{
                res.status(400).json(new Status('mã làm mới không đúng', 'False', ''))
            }
        }catch (err) {
            res.status(400).json(new Status(String(err), 'False', ''))
        }

    }
}
