export class LoginDTO{
    constructor(message: string, token: string, username: string){
        this.message = message;
        this.token = token;
        this.username =  username;
    }
    message: string;
    token: string;
    username: string;
}
