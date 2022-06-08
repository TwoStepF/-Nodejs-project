export default interface IServer {
    id:number; 
    name: string;
    status: boolean;
    isRunSSH: boolean;
    speed: number;
    address: string;
    adminId: number;
}