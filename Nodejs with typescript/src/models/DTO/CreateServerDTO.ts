import { AdminDTO } from "./AdminDTO";

export class CreateServerDTO{
    constructor(name: string, address: string, password: string, username: AdminDTO) {
        this.name = name;
        this.address = address;
        this.password = password;
        this.username = username;
    }
    username: AdminDTO;
    name: string;
    password: string;
    address: string;
}