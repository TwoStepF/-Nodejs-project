import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs"
import AdminRepository from '../repository/AdminRepository';

const register = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body
    bcryptjs.hash(password, 10, (hashError, hash) => {
        if(hashError){
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            })
        }
        AdminRepository.QueryRegister(req, res, username, hash)
    })
}

const login = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body
    AdminRepository.QueryLogin(req, res, username, password)
}

export default { login, register}