
import extractJWT from "../middleware/extractJWT";

export default class BaseRouter {
    private router: any;
    private controller: any;
    constructor(router: any, controller: any) {
        this.router = router
        this.controller = controller
    }

    getWithToken(path: string, controllerFuntion: string){
        this.router.get(path, extractJWT.ExtractToken, this.controller[controllerFuntion])
    }

    putWithToken(path: string, controllerFuntion: string){
        this.router.get(path, extractJWT.ExtractToken, this.controller[controllerFuntion])
    }

    postWithToken(path: string, controllerFuntion: string){
        this.router.post(path, extractJWT.ExtractToken, this.controller[controllerFuntion])
    }

    deleteWithToken(path: string, controllerFuntion: string){
        this.router.get(path, extractJWT.ExtractToken, this.controller[controllerFuntion])
    }

    get(path: string, controllerFuntion: string){
        this.router.get(path, this.controller[controllerFuntion])
    }

    put(path: string, controllerFuntion: string){
        this.router.get(path, this.controller[controllerFuntion])
    }
    post(path: string, controllerFuntion: string){
        this.router.post(path, this.controller[controllerFuntion])
    }
    delete(path: string, controllerFuntion: string){
        this.router.get(path, this.controller[controllerFuntion])
    }

}
