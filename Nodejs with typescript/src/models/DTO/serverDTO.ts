export class ServerDTO{
    constructor(id: number, name: string, status: string, isRunSSH: string, speed: number, address: string, adminID: number) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.isRunSSH =  isRunSSH;
        this.speed =  speed;
        this.address = address;
        this.adminID = adminID;
    }
    id: number;
    name: string;
    status: string;
    isRunSSH: string;
    speed: number;
    address: string;
    adminID: number;
}