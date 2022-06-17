
import { Status } from './../DTO/Status';
import { con } from "../../config/dbConnect";

import config from "../../config/config";
import {RegisterDTO} from "../DTO/RegisterDTO";
import {Admin} from "../Entitys/Admin";


const createAdmin = (register: RegisterDTO): Promise<Status> => {
    console.log(register)
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

const findAdminByName = (name: string): Promise<Admin> => {
    let admin: Admin = new Admin(-1, '', '')
    let sql = `select * from admin where admin_name = "${name}"`
    return new Promise(function(resolve, reject){
        con.query(sql, function (err, rs){
                try {
                    admin = new Admin(rs[0].id, rs[0].admin_name, rs[0].password)
                    resolve(admin)
                }catch (err){
                    resolve(admin)
                }
        });
    })
}
export default { createAdmin, findAdminByName }
