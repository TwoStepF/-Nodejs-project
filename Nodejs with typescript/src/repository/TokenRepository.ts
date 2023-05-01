import BaseRepository from "./BaseRepository";
import {UpdateServerDTO} from "../DTO/UpdateServerDTO";
import {Status} from "../DTO/Status";
import {con} from "../config/dbConnect";

export default class TokenRepository extends BaseRepository{

    createToken(rftoken: string, username: string): Promise<Status>{
        let sql = "INSERT INTO rftoken (rftoken, usernmae) VALUES ( ?, ?)"
        console.log(sql)
        let status = new Status('Cập nhật thất bại', 'False', '')
        return new Promise(function(resolve, reject){
            con.query(sql, [rftoken, username], async function (err) {
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