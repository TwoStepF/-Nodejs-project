import jwt from 'jsonwebtoken';

import config from "../config/config";
import loggin from "../config/loggin";
import IUser from "../interfaces/Admin";

const NAMESPACE = "Auth";
const signJWT = (Admin: any, callback: (error: Error | null, token: string | null) => void): void => {
    var time = new Date().getTime()
    var expirationTime = time + Number(config.server.token.expireTime) * 100000;
    var expirationTimeinSeconds = Math.floor(expirationTime / 1000);
    loggin.info(NAMESPACE, `Attempting to sign token for ${Admin.username}`)

    try {
        jwt.sign(
            {
                username: Admin.username
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeinSeconds
            },
            (error, token) => {
                if(token) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        )
    } catch (error) {
        console.log('ddd')
    }
}


export default signJWT;