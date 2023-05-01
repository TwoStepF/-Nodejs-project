export class UpdateServerDTO{
    constructor(name: string, address: string, id: number) {
        this.name = name;
        this.address = address;
        this.id = id;
    }
    name: string;
    address: string;
    id: number
}
