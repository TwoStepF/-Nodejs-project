import Router from "express";
import AdminController from "../controller/AdminController";

const AdminRouter =  Router();

AdminRouter.post('/register', AdminController.register);
AdminRouter.post('/login', AdminController.login);

export default AdminRouter;