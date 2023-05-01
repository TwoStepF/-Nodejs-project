export class ServerDTO{
    constructor(id: number, name: string, status: string, isRunSSH: string, speed: number, address: string, admin: string, ram: number) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.isRunSSH =  isRunSSH;
        this.speed =  speed;
        this.address = address;
        this.admin = admin;
        this.ram = ram;
    }
    id: number;
    name: string;
    status: string;
    isRunSSH: string;
    speed: number;
    address: string;
    admin: string;
    ram: number
}