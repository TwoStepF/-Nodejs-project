export class Server{
    constructor(id: number, name: string, status: string, isRunSSH: string, speed: number, address: string, adminID: number, password: string, ram: number) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.isRunSSH =  isRunSSH;
        this.speed =  speed;
        this.address = address;
        this.adminId = adminID;
        this.password = password;
        this.ram = ram
    }
    id: number;
    name: string;
    status: string;
    isRunSSH: string;
    password: string;
    speed: number;
    adminId: number;
    address: string;
    ram: number
}