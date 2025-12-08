import { useEffect, useState } from "react"

interface Bairros {
  id: number
  nome: string
  estado: string
  cidade: string
  cep_inicial: string
  cep_final: string
}

export default function BairrosCards() {
    const [qtdBairros, setQtdBairros] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)

    const fetchQtdBairros = () => {
        setLoading(true)
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        const requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        }

        fetch("http://localhost:8080/bairros", requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao buscar bairros: ${response.status}`)
                }
                return response.json()
            })
            .then((result: Bairros[]) => {
                setQtdBairros(result.length)
                setLoading(false)
            })
            .catch(error => {
                console.error("Erro ao buscar bairros", error)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchQtdBairros()
    }, [])

    return(
        <div className="w-3/12 h-32 flex flex-col  rounded-lg border-2 border-gray-200 shadow-md shadow-blue-300  dark:border-white dark:bg-gray-800 p-4">
            <h2 className="text-xl font-bold mb-2 dark:text-white">Bairros</h2>
            <div className="flex-1 flex items-center justify-center">
                {loading ? (
                    <p className="text-center dark:text-gray-300">Carregando...</p>
                ) : (
                    <p className="text-center text-3xl font-bold dark:text-white">{qtdBairros}</p>
                )}
            </div>
        </div>
    )
}