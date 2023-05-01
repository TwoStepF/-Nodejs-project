import { Status } from './Status';
export class LoginDTO{
    constructor(message: string, token: string, refreshToken: string, username: string, status: string){
        this.message = message;
        this.token = token;
        this.username =  username;
        this.refreshToken = refreshToken;
        this.status = status;
    }
    status: string
    message: string;
    token: string;
    refreshToken: string
    username: string;
}
