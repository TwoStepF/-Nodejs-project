import Router from "express";
import AuthController from "../controller/AuthController";

const AdminRouter =  Router();

AdminRouter.post('/register', AuthController.register);
AdminRouter.post('/login', AuthController.login);

export default AdminRouter;
