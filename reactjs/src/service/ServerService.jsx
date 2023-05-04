import axiosClient from "./axiosClient"
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
  };

const ServerService = {
    getAllServer() {
        const url = '/server'
        return axiosClient.get(url, config)
    },
    createServer(name, address, password) {
        const url = '/server'
        return axiosClient.post(url, {
            name,
            password,
            address
        }, config)
    },
    updateServer(id, name, address) {
        const url = `/server/${id}`
        return axiosClient.put(url, {
            id,
            name,
            address
        }, config)
    },
    deleteServer(params) {
        const url = '/server/' + params
        return axiosClient.delete(url, config)
    },
    getByKey(key, name, status, type, order){
        const url = `/server/search?key=${key}&name=${name}&status=${status}&type=${type}&order=${order}`
        console.log(url)
        return axiosClient.get(url, config)
    },
    // test(){
    //     const url = `/api/exam`
    //     console.log(url)
    //     return axiosClient.get(url, config)
    // }
}

export default ServerService
