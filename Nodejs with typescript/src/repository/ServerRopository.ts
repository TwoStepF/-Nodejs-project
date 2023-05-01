import { Status } from '../DTO/Status';
import { Admin } from '../Entitys/Admin';
import { con } from "../config/dbConnect";
import { Server } from "../Entitys/Server";
import { CreateServerDTO } from "../DTO/CreateServerDTO";

import {UpdateServerDTO} from "../DTO/UpdateServerDTO";
import BaseRepository from "./BaseRepository";

export default class ServerRopository extends BaseRepository{
    constructor(column: string) {
        super(column);
    }
    createServer = (server: CreateServerDTO): Promise<Status> => {
        let status = new Status('Tạo server thất bại', 'False', '')
        return new Promise(function(resolve, reject){
            con.query(`INSERT INTO server (name, password, address, adminId) VALUES ( ?, ?, ?, ?)`,[server.name, server.password, server.address, server.username.id], async function (err) {
                if (err) {
                   reject(err)
                }else{
                    status = new Status('Tạo thành công', 'OK', '')
                    resolve(status)
                }
            });
        });
    }
    filterServer(key: string, idColumn: any, adminid: number, Status: any, type: string, order: string): Promise<Array<Server>> {
        key = `%${key}%`
        if(Status === null){
            Status = ''
        }
        let Servers: Array<Server> = new Array();
        return new Promise(function (resolve, reject) {
            con.query(`select * FROM server WHERE name LIKE ? and status =  ? and ${idColumn} = ? order by ${type} ${order}`,[key, Status, idColumn, adminid, type, order], function (err, result) {
                if(err){
                    console.log(err)
                    resolve(Servers)
                }else{
                    for (let rs of result) {
                        let server = new Server(rs.id, rs.name, rs.status, rs.isRunSSH, rs.speed, rs.address, rs.adminId, rs.password, rs.ram)
                        Servers.push(server)
                    }
                    resolve(Servers)
                }
            });
        });
    }
    updateServer(server: UpdateServerDTO): Promise<Status>{
        let sql = "UPDATE server SET name = ?, address = ? WHERE id = ?"
        console.log(sql)
        let status = new Status('Cập nhật thất bại', 'False', '')
        return new Promise(function(resolve, reject){
            con.query(sql, [server.name, server.address, server.id], async function (err) {
                if (err) {
                    reject(err)
                }else{
                    status = new Status('Cập nhật thành công', 'OK', '')
                    resolve(status)
                }
            });
        });
    }


}

