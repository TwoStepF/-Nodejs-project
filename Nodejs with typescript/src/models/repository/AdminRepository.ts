
import { Status } from './../DTO/Status';
import { con } from "../../config/dbConnect";

import config from "../../config/config";
import {RegisterDTO} from "../DTO/RegisterDTO";
import BaseRepository from "./BaseRepository";


export default class AdminRepository extends BaseRepository{
    static createAdmin(register: RegisterDTO): Promise<Status>{
        let sql = `INSERT INTO admin (admin_name, password) VALUES ("${register.username}", "${register.password}")`
        let status = new Status(
            config.message.message.register_error,
            config.message.status.status_false,
            '')
        return new Promise(function(resolve, reject){
            con.query(sql, function (err, rs) {
                if(err){
                    console.log(err)
                    resolve(status)
                }else
                {
                    status = new Status(config.message.message.register_succesfull, config.message.status.status_ok, '')
                    resolve(status)
                }
            });
        })
    }
}
