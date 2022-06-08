import jwt from 'jsonwebtoken';
import { con } from "../config/dbConnect";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs"
import config from "../config/config";

const QueryRegister = (req: Request, res: Response, username: String, password: String) => {
    let sql = `INSERT INTO admin (admin_name, password) VALUES ("${username}", "${password}")`
    con.query(sql, function (err, result) {
        if (err) 
            res.status(400).json({message: 'Admin name already exists!!'});
        else{
            res.status(200).json({message: 'Register success!!'});
        }
    });
}

const QueryLogin = (req: Request, res: Response, username: string, password: string) => {
    let sql = `select * from admin where admin_name = ${username}`
    con.query(sql, function (err, result) {
        if (err) {
            res.status(400).json({message: 'Incorrect account or passworddd'});
        }
        else{
            bcryptjs.compare(password, result[0].password, (error, _result) => {
                if (error) {
                    return res.status(401).json({
                        message: 'Incorrect account or password'
                    });
                } else if(_result) {
                    var time = new Date().getTime()
                    var expirationTime = time + Number(config.server.token.expireTime) * 100000;
                    var expirationTimeinSeconds = Math.floor(expirationTime / 1000);
                    let token = jwt.sign(
                        {
                            username: username
                        },
                            config.server.token.secret,
                        {
                            issuer: config.server.token.issuer,
                            algorithm: 'HS256',
                            expiresIn: expirationTimeinSeconds
                        }
                    )
                    return res.status(200).json({
                        message: 'Auth Successful',
                        token,
                        user: username
                    });
                }
            });
        }
    });
}
export default { QueryRegister, QueryLogin }