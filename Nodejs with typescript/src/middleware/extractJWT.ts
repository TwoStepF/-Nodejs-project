import { Response, Request, NextFunction } from "express";
import loggin from "../config/loggin";
import jwt, { decode } from "jsonwebtoken";
import config from "../config/config";

const NAMESPACE = "Auth";

const ExtractToken = (req: Request, res: Response, next: NextFunction) => {
    loggin.info(NAMESPACE, 'Validating Token');

    let token = req.headers.authorization?.split(' ')[1];

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

const GetNameFromRequest = (req: Request, res: Response) => {
    let token = String(req.headers.authorization?.split(' ')[1]);
    let decoded = jwt.verify(token, config.server.token.secret);
}

export default {
    ExtractToken,
    GetNameFromRequest
}
