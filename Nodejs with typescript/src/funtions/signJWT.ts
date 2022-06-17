import jwt from 'jsonwebtoken';

import config from "../config/config";
import loggin from "../config/loggin";
import {Admin} from "../models/Entitys/Admin";


const NAMESPACE = "Auth";
const signJWT = (admin_name: string): string => {
    let time = new Date().getTime()
    let expirationTime = time + Number(config.server.token.expireTime) * 100000;
    let expirationTimeinSeconds = Math.floor(expirationTime / 1000);
    loggin.info(NAMESPACE, `Attempting to sign token for ${admin_name}`)
    return jwt.sign(
        { username: admin_name },
        config.server.token.secret,
        {
            issuer: config.server.token.issuer,
            algorithm: 'HS256',
            expiresIn: expirationTimeinSeconds
        })
}


export default signJWT;
