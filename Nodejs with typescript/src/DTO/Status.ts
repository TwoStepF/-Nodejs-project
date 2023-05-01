export class Status{
    constructor(message: string, status: string, data: any){
        this.message =  message;
        this.status = status;
        this.data =  data;
    }
    message: string;
    status: string;
    data: string;
}