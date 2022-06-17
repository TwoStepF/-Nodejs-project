import AdminController from './../controller/ServerController';
import Router from "express";
import ExtractToken from '../middleware/extractJWT';
const routerServer = Router();

routerServer.get('/', ExtractToken, AdminController.getAllServer)
routerServer.get('/:id', ExtractToken, AdminController.getDetailServer)
routerServer.put('/:id', ExtractToken, AdminController.updateServer)
routerServer.post('/', ExtractToken, AdminController.createServer)
routerServer.delete('/:id', ExtractToken, AdminController.deleteServer)


export default routerServer
