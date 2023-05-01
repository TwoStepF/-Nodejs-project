import { Response, Request, NextFunction } from "express";
import loggin from "../config/loggin";
import jwt, { decode } from "jsonwebtoken";
import config from "../config/config";
import AdminRepository from "../repository/AdminRepository";
import { AdminDTO } from "../DTO/AdminDTO";
import {con} from "../config/dbConnect";
import {Status} from "../DTO/Status";

const NAMESPACE = "Auth";
interface JwtPayload {
    username: string
  }

const ExtractToken = (req: Request, res: Response, next: NextFunction) => {
    loggin.info(NAMESPACE, 'Validating Token');
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtoYW5oMjAwMSIsImlhdCI6MTY4MjkzMDU1NywiZXhwIjoxNjgyOTMwNTc3LCJpc3MiOiJ0b2tlbiJ9.0iTstbSsinoEPMEE8BNrC4ZUylYjDCKuMA2HVEQoLcg".split(' ')[1]
    if (token){
        jwt.verify(token, config.server.token.secret, (error, decode) => {
            if(error){
                return res.status(400).json({
                    message: 'Bạn không có quyền 1',
                    type: error
                });
            } else {
                res.locals.jwt = decode;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'Bạn không có quyền'
        });
    }
};

const GetUserFromRequest = async (req: Request, res: Response): Promise<AdminDTO> => {
    let token = String(req.headers.authorization?.split(' ')[1]);
    let decoded = jwt.verify(token, config.server.token.secret) as JwtPayload
    const adminRepository = new AdminRepository('admin')
    let admin: AdminDTO = await adminRepository.findByUniqueColumn('admin_name', decoded.username);
    return admin
}

const GetUserFromToken = (token: string): Promise<AdminDTO> => {
    return new Promise(async function(resolve, reject){
        try {
            let decoded = jwt.verify(token, config.server.token.secret) as JwtPayload
            const adminRepository = new AdminRepository('admin')
            let admin = await adminRepository.findByUniqueColumn('admin_name', decoded.username)
            resolve(admin)
        }catch (e) {
            reject(e)
        }
    })
}
export default {
    ExtractToken,
    GetUserFromRequest,
    GetUserFromToken
}
