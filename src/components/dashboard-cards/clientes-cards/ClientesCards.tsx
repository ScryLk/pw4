import { useEffect, useState } from "react"
import api from "@/lib/axios"

export default function ClientesCards() {
    const [qtdClientes, setQtdClientes] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    useEffect(() => {
        // Verifica se é admin
        const userType = localStorage.getItem('userType')
        setIsAdmin(userType === 'ADMIN')
    }, [])

    const fetchQtdClientes = async () => {
        // Só busca se for admin
        if (!isAdmin) {
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            setError(false)
            const response = await api.get('/users')
            setQtdClientes(response.data.length)
        } catch (err) {
            console.error("Erro ao buscar clientes", err)
            setError(true)
            setQtdClientes(0)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isAdmin) {
            fetchQtdClientes()
        } else {
            setLoading(false)
        }
    }, [isAdmin])

    return(
        <div className="w-3/12 h-32 shadow-md shadow-blue-300 flex flex-col rounded-lg border-2 border-gray-200 dark:border-white dark:bg-gray-800 p-4 pl-4">
            <h2 className="text-xl font-bold mb-2 dark:text-white">Clientes</h2>
            <div className="flex-1 flex items-center justify-center">
                {loading ? (
                    <p className="text-center dark:text-gray-300">Carregando...</p>
                ) : error ? (
                    <p className="text-center text-sm text-red-500 dark:text-red-400">Erro ao carregar</p>
                ) : !isAdmin ? (
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">Apenas admin</p>
                ) : (
                    <p className="text-center text-3xl font-bold dark:text-white">{qtdClientes}</p>
                )}
            </div>
        </div>
    )
}