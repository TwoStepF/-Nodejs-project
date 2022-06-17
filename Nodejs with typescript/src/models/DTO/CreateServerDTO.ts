export class CreateServerDTO{
    constructor(name: string, address: string, password: string) {
        this.name = name;
        this.address = address;
        this.password = password;
    }
    name: string;
    password: string;
    address: string;
}