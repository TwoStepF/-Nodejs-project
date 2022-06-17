
import { con } from "../../config/dbConnect";
import { Server } from "../Entitys/Server";
import { CreateServerDTO } from "../DTO/CreateServerDTO";
import { Status } from "../DTO/Status";
import {UpdateServerDTO} from "../DTO/UpdateServerDTO";


const findAll = (): Array<Server> => {
        let sql = "select * from server"
        let Servers: Array<Server> = new Array();
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err)
            }else{
                for(var rs of result){
                    let server = new Server(rs.id, rs.name, rs.status, rs.isRunSSH, rs.speed, rs.address, rs.adminID, rs.password)
                    Servers.push(server)
                }
            }
        });
        return Servers;
}

const findServerByUniqueColumn = (column: string, where: any): Server => {
    let sql = `select * from server where ${column} = '${where}'`
    if (typeof where === "number") {
        sql = `select * from server where ${column} = ${where}`
    }
    let server!: Server
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
        }else{
            server = new Server(
                result.id, result.name, 
                result.Status, result.isRunSSH,
                result.speed, result.address, 
                result.adminID, result.password
            );
        }
    });
    return server;
}


const updateServer = (server: UpdateServerDTO): Status => {
    let sql = `UPDATE server SET name = ${server.name}, address = ${server.address} WHERE id = ${server.id}`
    con.query(sql, function (err) {
        if (err) {
            console.log(err)
            if (findServerByUniqueColumn('name', server.name)){
                return new Status('Tên server đã tồn tại', 'False', '')
            }
            if(findServerByUniqueColumn('address', server.address)){
                return new Status('Địa chỉ server đã tồn tại', 'False', '')
            }
        }
    });
    return new Status('cập nhật server thành công', 'OK', '')
}

const createServer = (server: CreateServerDTO): Status => {
    let sql = `INSERT INTO server (name, password, address) VALUES ("${server.name}", "${server.password}", "${server.address}")`
    con.query(sql, function (err) {
        if (err) {
            console.log(err)
            if (findServerByUniqueColumn('name', server.name)){
                return new Status('Tên server đã tồn tại', 'False', '')
            }
            if(findServerByUniqueColumn('address', server.address)){
                return new Status('Địa chỉ server đã tồn tại', 'False', '')
            }
        }
    });
    return new Status('Cập nhật server thành công', 'OK', '')
}

const deleteServer = (id: number): Status => {
    let sql = `DELETE FROM server WHERE id = ${id}`;
    con.query(sql, function (err) {
        if (err) {
            console.log(err)
            return new Status('Xóa không thành công', 'False', '')
        }
    });
    return new Status('Xóa thành công', 'Ok', '')
}

const findServerByKey = (key: string): Array<Server> => {
    let sql = `select * FROM server WHERE name LIKE '%${key}%'`;
    let Servers: Array<Server> = new Array();
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            return Servers;
        }else{
            for(let rs of result){
                let server = new Server(rs.id, rs.name, rs.status, rs.isRunSSH, rs.speed, rs.address, rs.adminID, rs.password)
                Servers.push(server)
            }
        }
    });
    return Servers;
}
export default { 
    findAll,
    findServerByUniqueColumn,
    createServer,
    updateServer,
    deleteServer,
    findServerByKey
 }
