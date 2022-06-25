import {Admin} from "../Entitys/Admin";
import {con} from "../../config/dbConnect";
import {Server} from "../Entitys/Server";
import {UpdateServerDTO} from "../DTO/UpdateServerDTO";
import {Status} from "../DTO/Status";

export default class BaseRepository{
    static findByUniqueColumn (table: string, column: string, value: any): Promise<any> {
        let Any!: any
        let sql = `select * from ${table} where ${column} = ${value}`
        return new Promise(function(resolve, reject){
            con.query(sql, function (err, rs){
                try {
                    resolve(rs[0])
                }catch (err){
                    resolve(Any)
                }
            });
        })
    }

    static findAll(table: string): Promise<Array<any>>{
        let sql = `select * from ${table}`
        return new Promise(function(resolve, reject){
            con.query(sql, function (err, rs) {
                resolve(rs);
            });
        })
    }

    static delete(table: string, column: string, id: number): Promise<Status>{
        let sql = `DELETE FROM ${table} WHERE ${column} = ${id}`;
        return new Promise(function(resolve, reject){
            con.query(sql, function (err) {
                if (err) {
                    console.log(err)
                    let status = new Status(String(err), 'False', '')
                    resolve(status)
                } else {
                    let status = new Status('Xóa thành công', 'False', '')
                    resolve(status)
                }
            });
        });
    }

    static findByUnuniqueColumn(table: string, column: string, value: any): Promise<Array<any>>{
        let sql = `select * FROM ${table} WHERE ${column} = ${value}`;
        return new Promise(function(resolve, reject){
            con.query(sql, function (err, result) {
                resolve(result)
            });
        });

    }
}
