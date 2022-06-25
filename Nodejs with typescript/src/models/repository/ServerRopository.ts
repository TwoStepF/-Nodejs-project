import { con } from "../../config/dbConnect";
import { Server } from "../Entitys/Server";
import { CreateServerDTO } from "../DTO/CreateServerDTO";
import { Status } from "../DTO/Status";
import {UpdateServerDTO} from "../DTO/UpdateServerDTO";
import BaseRepository from "./BaseRepository";

export default class ServerRopository extends BaseRepository{
    static createServer = (server: CreateServerDTO): Promise<Status> => {
        let sql = `INSERT INTO server (name, password, address) VALUES ("${server.name}", "${server.password}", "${server.address}")`
        let status = new Status('Tạo server thất bại', 'False', '')
        return new Promise(function(resolve, reject){
            con.query(sql, async function (err) {
                if (err) {
                    console.log(status)
                    status = new Status('Địa chỉ hoặc tên server đã tồn tại', 'False', '')
                    resolve(status)
                    console.log(status)
                }else{
                    status = new Status('Tạo thành công', 'Ok', '')
                    resolve(status)
                    console.log(status)
                }
            });
        });
    }
    static findServerByKey(key: string): Promise<Array<Server>> {
        let sql = `select *
                   FROM server
                   WHERE name LIKE '%${key}%'`;
        let Servers: Array<Server> = new Array();
        return new Promise(function (resolve, reject) {
            con.query(sql, function (err, result) {
                for (let rs of result) {
                    let server = new Server(rs.id, rs.name, rs.status, rs.isRunSSH, rs.speed, rs.address, rs.adminID, rs.password)
                    Servers.push(server)
                }
                resolve(Servers)
            });
        });
    }
    static updateServer(server: UpdateServerDTO): Promise<Status>{
        let sql = `UPDATE server SET name = '${server.name}', address = '${server.address}' WHERE id = ${server.id}`
        let status = new Status('Cập nhật thất bại', 'False', '')
        return new Promise(function(resolve, reject){
            con.query(sql, async function (err) {
                if (err) {
                    console.log(err)
                    status = new Status('Địa chỉ hoặc tên server đã tồn tại', 'False', '')
                    resolve(status)
                }else{
                    status = new Status('Cập nhật thành công', 'Ok', '')
                    resolve(status)
                }
            });
        });
    }
}

