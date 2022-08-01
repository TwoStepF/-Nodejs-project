import extractJWT from "../middleware/extractJWT";

export default class BaseRouter {
    private router: any;
    private controller: any;
    constructor(router: any, controller: any) {
        this.router = router
        this.controller = controller
    }

    get(path: string, token: boolean, controllerFuntion: string){
        if(token) {
            this.router.get(path, extractJWT.ExtractToken, this.controller[controllerFuntion])
        }
        else{
            this.router.get(path, this.controller[controllerFuntion])
        }
    }

    put(path: string, token: boolean, controllerFuntion: string){
        if(token){
            this.router.put(path, extractJWT.ExtractToken, this.controller[controllerFuntion])
        }else{
            this.router.put(path, this.controller[controllerFuntion])
        }
    }

    post(path: string, token: boolean, controllerFuntion: string){
        if(token){
            this.router.post(path, extractJWT.ExtractToken, this.controller[controllerFuntion])
        }else{
            this.router.post(path, this.controller[controllerFuntion])
        }
    }

    delete(path: string,token: boolean, controllerFuntion: string){
        if(token){
            this.router.delete(path, extractJWT.ExtractToken, this.controller[controllerFuntion])
        }else{
       
            this.router.delete(path, this.controller[controllerFuntion])
        }
    }

}
