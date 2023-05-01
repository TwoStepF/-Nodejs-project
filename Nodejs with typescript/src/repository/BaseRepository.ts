import {Admin} from "../Entitys/Admin";
import {con} from "../config/dbConnect";
import {Server} from "../Entitys/Server";
import {UpdateServerDTO} from "../DTO/UpdateServerDTO";
import {Status} from "../DTO/Status";

export default class BaseRepository{
    table: string
    constructor(table: string) {
        this.table = table
    }
    findByUniqueColumn (column: string, value: any): Promise<any> {
        const table = this.table
        return new Promise(function(resolve, reject){
            con.query("select * from " + table + " where " + column + " = ?",[value], function (err, rs){
                if(err){
                    reject(err)
                }
                else{
                    resolve(rs[0])
                }
            });
        })
    }

    findAll(): Promise<Array<any>>{
        let sql = "select * from " + this.table
        return new Promise(function(resolve, reject){
            con.query(sql, function (err, rs) {
                if(err){
                    reject(err)
                }else{
                    resolve(rs);
                }
            });
        })
    }

    delete(column: string, id: number): Promise<Status>{
        const table = this.table
        return new Promise(function(resolve, reject){
            con.query("delete from " + table + " where " + column + " = ?",[id], function (err) {
                if (err) {
                    reject(err)
                } else {
                    let status = new Status('Xóa thành công', 'OK', '')
                    resolve(status)
                }
            });
        });
    }

    static findByUnUniqueColumn(table: string, column: string, value: any): Promise<Array<any>>{
        return new Promise(function(resolve, reject){
            con.query("select * from " + table + " where " + column + " = ?", [value], function (err, result) {
                resolve(result)
            });
        });

    }
}
