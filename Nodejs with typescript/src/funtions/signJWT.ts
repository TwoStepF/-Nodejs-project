import jwt from 'jsonwebtoken';

import config from "../config/config";
import loggin from "../config/loggin";
import {Admin} from "../Entitys/Admin";


const NAMESPACE = "Auth";
const signJWT = (admin_name: string, issuer: string): string => {

    loggin.info(NAMESPACE, `Attempting to sign token for ${admin_name}`)
    if(issuer === 'token')
        return jwt.sign(
            { username: admin_name },
            config.server.token.secret,
            {
                issuer: issuer,
                algorithm: 'HS256',
                expiresIn: 20
            })
    return jwt.sign(
        { username: admin_name },
        config.server.token.secret,
        {
            issuer: issuer,
            algorithm: 'HS256'
        })
}


export default signJWT;
