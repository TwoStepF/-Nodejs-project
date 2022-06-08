import { con } from "../config/dbConnect";
import { Request, Response } from "express";
import IServer from "../interfaces/Server";
const querygetAllServer = (req: Request, res: Response) => {
        var sql = "select * from server"
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                res.status(400).json({message: 'bad request'});
            }else{
                let Server: Array<IServer>;
                for(var rs of result){
                    rs.password = null;
                }
            res.json(result);
            }
        });
    }
const querygetDetailServer = (req: Request, res: Response) => {
    var sql = `select * from server where id = ${req.params.id}`
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            res.status(400).json({message: 'bad request'});
        }else{
            result[0].password = null;
            res.json(result[0]);
        }
    });
}

const queryUpdateServer = (req: Request, res: Response) => {
    var sql = `UPDATE server SET name = ${req.body.name}, address = ${req.body.address} WHERE id = ${req.body.id}`
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            res.status(400).json({message: 'error'});
        }else{ res.status(200).json({message: 'oke'}); }
    });
}

const queryCreateServer = (req: Request, res: Response) => {
    var sql = `INSERT INTO server (name, password, address) VALUES ("${req.body.username}", "${req.body.password}", "${req.body.address}")`
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            res.status(400).json({message: 'error'});
        }else{ res.status(200).json({message: 'oke'}); }
    });
}

const queryDeleteServer = (req: Request, res: Response) => {
    var sql = `DELETE FROM server WHERE id = ${req.params.id}`;
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            res.status(400).json({message: 'error'});
        }else{ 
            res.status(200).json({message: 'oke'}); 
        }
    });
}
export default { 
    querygetAllServer,
    querygetDetailServer,
    queryUpdateServer,
    queryCreateServer,
    queryDeleteServer
 }