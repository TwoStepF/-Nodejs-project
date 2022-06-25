import ServerController from './../controller/ServerController';
import Router, {NextFunction, Request, Response} from "express";
import ServerRouter from "../middleware/ServerRouter";



const routerServer = Router();


const serverRouter = new ServerRouter(routerServer, ServerController);
serverRouter.getWithToken('/search', 'findServerByKey')
serverRouter.getWithToken('/:id', 'getDetailServer')
serverRouter.putWithToken('/:id', 'updateServer')
serverRouter.deleteWithToken('/:id', 'deleteServer')
serverRouter.postWithToken('/', 'createServer')
serverRouter.getWithToken('/', 'getAllServer')

export default routerServer












// routerServer.get('/search', validateData.validateLogin(), function (req: Request, res: Response, next: NextFunction) {
//     const errors = validationResult(req);
//     if(errors.isEmpty()){
//         next()
//     }else{
//         res.json(errors)
//     }
// },AdminController.findServerByKey)
//
// routerServer.get('/:id', validateData.validateIdFromParam(), function (req: Request, res: Response, next: NextFunction) {
//     const errors = validationResult(req);
//     if(errors.isEmpty()){
//         next()
//     }else{
//         res.json(errors)
//     }
// },AdminController.getDetailServer)
//
// routerServer.put('/:id', validateData.validateUpdateServer(), function (req: Request, res: Response, next: NextFunction) {
//     const errors = validationResult(req);
//     if(errors.isEmpty()){
//         next()
//     }else{
//         res.json(errors)
//     }
// },AdminController.updateServer)
//
// routerServer.delete('/:id', validateData.validateIdFromParam(), function (req: Request, res: Response, next: NextFunction) {
//     const errors = validationResult(req);
//     if(errors.isEmpty()){
//         next()
//     }else{
//         res.json(errors)
//     }
// },AdminController.deleteServer)
//
// routerServer.get('/', AdminController.getAllServer)
//
// routerServer.post('/',extractJWT.ExtractToken, validateData.validateCreateServer(), function (req: Request, res: Response, next: NextFunction) {
//     const errors = validationResult(req);
//     if(errors.isEmpty()){
//         next()
//     }else{
//         res.json(errors)
//     }
// }, AdminController.createServer)
