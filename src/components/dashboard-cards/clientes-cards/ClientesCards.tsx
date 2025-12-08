import { useEffect, useState } from "react"

interface Cliente {
  nome: string
  email: string
  senha: string
  tipo: string
}

export default function ClientesCards() {
    const [qtdClientes, setQtdClientes] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)

    const fetchQtdClientes = () => {
        setLoading(true)
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        const requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        }

        fetch("http://localhost:8080/users", requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao buscar clientes: ${response.status}`)
                }
                return response.json()
            })
            .then((result: Cliente[]) => {
                setQtdClientes(result.length)
                setLoading(false)
            })
            .catch(error => {
                console.error("Erro ao buscar clientes", error)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchQtdClientes()
    }, [])

    return(
        <div className="w-3/12 h-32 shadow-md shadow-blue-300 flex flex-col rounded-lg border-2 border-gray-200 dark:border-white dark:bg-gray-800 p-4 pl-4">
            <h2 className="text-xl font-bold mb-2 dark:text-white">Clientes</h2>
            <div className="flex-1 flex items-center justify-center">
                {loading ? (
                    <p className="text-center dark:text-gray-300">Carregando...</p>
                ) : (
                    <p className="text-center text-3xl font-bold dark:text-white">{qtdClientes}</p>
                )}
            </div>
        </div>
    )
}