
import axiosClient from "./axiosClient"

const AuthService = {
    login(username, password) {
        const url = '/auth/login'
        console.log(username)
        return axiosClient.post(url, {
            username,
            password
        })
    },
    register(username, password) {
        const url = '/auth/register'
        return axiosClient.post(url, {
            username,
            password
        })
    },
    logout(){
        localStorage.clear();
        window.location.replace("/login")
    },
    isAuth(){
        if(!localStorage.getItem('username')){
            window.location.replace("/login")
        }
    }
}

export default AuthService