export class Admin {
    constructor(id: number, admin_name: string, password: string) {
        this.id = id;
        this.admin_name = admin_name;
        this.password = password;
    }
    id: number
    admin_name: string
    password: string
}