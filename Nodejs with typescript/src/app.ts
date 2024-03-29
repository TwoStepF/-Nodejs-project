import express, { Router } from "express";
import bodyParser from "body-parser";
import routerServer from "./router/server";
import {con} from "./config/dbConnect";
import AdminRouter from "./router/auth";
const PORT = 8084;

export class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.mainRouter();
        this.listen();
    }

    private config(): void{
        // Giúp chúng ta tiếp nhận dữ liệu từ body của request
        this.app.use(bodyParser.urlencoded({ extended: false}));
        this.app.use(bodyParser.json());
        var cors = require('cors');
        this.app.use(cors());
    }

    public listen(){
        this.app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        })
    }

    public mainRouter(){
        this.app.use('/server', routerServer)
        this.app.use('/auth', AdminRouter)
    }

    public createData(){
            con.query("CREATE TABLE admin"+
                        "(id INT AUTO_INCREMENT PRIMARY KEY,"+
                        " admin_name NVARCHAR(255) NOT NULL UNIQUE,"+
                        " password VARCHAR(255) NOT NULL);", function (err, result) {
                if (err)
                    return;
                console.log("Table created admin");
            });
            con.query("CREATE TABLE server"+
                        "(id INT AUTO_INCREMENT PRIMARY KEY,"+
                        " name NVARCHAR(255) NOT NULL UNIQUE,"+
                        " password VARCHAR(255) NOT NULL,"+
                        " status boolean default false,"+
                        " isRunSSH boolean default false,"+
                        " speed float(10, 2),"+
                        " ram float(10, 2),"+
                        " address VARCHAR(255) NOT NULL UNIQUE,"+
                        " adminId int NOT NULL,"+
                        " FOREIGN KEY (adminId) REFERENCES admin(id));", function (err, result) {
                if (err) console.log();
                console.log("Table created server");
            });
        con.query("CREATE TABLE rfToken"+
            "(id INT AUTO_INCREMENT PRIMARY KEY,"+
            " rftoken NVARCHAR(255) NOT NULL UNIQUE,"+
            " usernmae VARCHAR(255) NOT NULL)", function (err, result) {
            if (err) return;
            console.log("Table created rfToken");
        });
        con.query("CREATE TABLE otp"+
            "(id INT AUTO_INCREMENT PRIMARY KEY,"+
            " OTP VARCHAR(255) NOT NULL UNIQUE,"+
            " time VARCHAR(255) NOT NULL)", function (err, result) {
            if (err) return;
            console.log("Table created rfToken");
        });
    }
}
