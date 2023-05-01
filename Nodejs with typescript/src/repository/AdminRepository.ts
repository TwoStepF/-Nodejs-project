
import { Status } from '../DTO/Status';
import { con } from "../config/dbConnect";

import config from "../config/config";
import {RegisterDTO} from "../DTO/RegisterDTO";
import BaseRepository from "./BaseRepository";


export default class AdminRepository extends BaseRepository{
    constructor(table: string) {
        super(table)
    }
    createAdmin(register: RegisterDTO): Promise<Status>{
        let status = new Status(
            config.message.message.register_error,
            config.message.status.status_false,
            '')
        return new Promise(function(resolve, reject){
            con.query("INSERT INTO admin (admin_name, password) VALUES ( ?, ?)", [register.username, register.password], function (err, rs) {
                if(err){
                    reject(err)
                }else
                {
                    status = new Status(config.message.message.register_succesfull, config.message.status.status_ok, '')
                    resolve(status)
                }
            });
        })
    }
}
