import mysql from "mysql"
import config from "./config";

export const con = mysql.createConnection({
        host: config.mysql.host,
        user: config.mysql.user,
        password: config.mysql.pass,
        database: config.mysql.database
});