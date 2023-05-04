import axios from 'axios';
import jwt from "jwt-decode";

const axiosClient = axios.create({
    baseURL: "http://localhost:8084"
})

const refreshToken = async (config) =>{
    let token = localStorage.getItem('token')
    let refreshtoken = localStorage.getItem('refreshToken')
    if(token){
        let exp = jwt(localStorage.getItem('token')).exp;
        let date = new Date()
        if (exp * 1000 < date.getTime()) {
            await axios.post("http://localhost:8084/auth/refresh", { refreshtoken }).then((res) =>
                config.headers["Authorization"] = "Bearer " + res.data.data
            ).catch(error => {
                console.log(error.response.data.message)
            });
        }
    }
    return config;
}

axiosClient.interceptors.request.use(async (config) => {
    return refreshToken(config);
}, function (error) {
    return Promise.reject(error)
  });


axiosClient.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error)
  });

export default axiosClient

