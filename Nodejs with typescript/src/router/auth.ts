import Router from "express";
import AuthController from "../controller/AuthController";
import AuthRouter from "../middleware/AuthRouter";

const Adminrouter =  Router();

const authRouter = new AuthRouter(Adminrouter, AuthController);
authRouter.post('/register', 'register');
authRouter.post('/login', 'login')
export default Adminrouter;

















// Adminrouter.post('/register', function (req: Request, res: Response, next: NextFunction) {
//     const errors = validationResult(req);
//     if(errors.isEmpty()){
//         next()
//     }
//     res.json(errors)
// },AuthController.register);
//
// Adminrouter.post('/login', function (req: Request, res: Response, next: NextFunction) {
//     const errors = validationResult(req);
//     if(errors.isEmpty()){
//         next()
//     }
//     res.json(errors)
// },AuthController.login);
