import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true  // Permite enviar cookies de sessão
})

api.interceptors.request.use(
    (config) => {
        // Se seu backend não usa autenticação por token, remova ou comente este interceptor
        const userId = localStorage.getItem('userId')
        console.log('Usuário logado ID:', userId)
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api;