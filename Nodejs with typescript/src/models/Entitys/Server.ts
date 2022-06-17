export class Server{
    constructor(id: number, name: string, status: string, isRunSSH: string, speed: number, address: string, adminID: number, password: string) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.isRunSSH =  isRunSSH;
        this.speed =  speed;
        this.address = address;
        this.adminID = adminID;
        this.password = password;
    }
    id: number;
    name: string;
    status: string;
    isRunSSH: string;
    password: string;
    speed: number;
    address: string;
    adminID: number;
}