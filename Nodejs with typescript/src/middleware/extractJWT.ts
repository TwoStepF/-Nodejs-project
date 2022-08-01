import { Response, Request, NextFunction } from "express";
import loggin from "../config/loggin";
import jwt, { decode } from "jsonwebtoken";
import config from "../config/config";
import AdminRepository from "../models/repository/AdminRepository";
import { AdminDTO } from "../models/DTO/AdminDTO";

const NAMESPACE = "Auth";
interface JwtPayload {
    username: string
  }

const ExtractToken = (req: Request, res: Response, next: NextFunction) => {
    loggin.info(NAMESPACE, 'Validating Token');
    let token = req.headers.authorization?.split(' ')[1]
    if (token){
        jwt.verify(token, config.server.token.secret, (error, decode) => {
            if(error){
                return res.status(400).json({
                    message: error.message,
                    error
                });
            } else {
                res.locals.jwt = decode;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

const GetNameFromRequest = async (req: Request, res: Response): Promise<AdminDTO> => {
    let token = String(req.headers.authorization?.split(' ')[1]);
    let decoded = jwt.verify(token, config.server.token.secret) as JwtPayload
    const adminRepository = new AdminRepository('admin')
    let admin: AdminDTO = await adminRepository.findByUniqueColumn('admin_name', decoded.username);
    return admin
}

export default {
    ExtractToken,
    GetNameFromRequest
}
