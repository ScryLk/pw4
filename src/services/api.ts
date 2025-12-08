import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true  
})

api.interceptors.request.use(
    (config) => {
        const userId = localStorage.getItem('userId')
        console.log('Usuário logado ID:', userId)
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api;