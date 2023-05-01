import { Status } from './Status';
export class LoginDTO{
    constructor(message: string, token: string, username: string, status: string){
        this.message = message;
        this.token = token;
        this.username =  username;
        this.status = status;
    }
    status: string
    message: string;
    token: string;
    username: string;
}
