import { useEffect, useState } from "react"

interface TipoImovel {
  id: number
  nome: string
  descricao: string
}

export default function TiposImoveisCards() {
    const [qtdTiposImoveis, setQtdTiposImoveis] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)

    const fetchQtdTiposImoveis = () => {
        setLoading(true)
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        const requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        }

        fetch("http://localhost:8080/tipos-imoveis/tipos-page", requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao buscar tipos de imóveis: ${response.status}`)
                }
                return response.json()
            })
            .then((result) => {
                const dados = Array.isArray(result) ? result : result.content || []
                setQtdTiposImoveis(dados.length)
                setLoading(false)
            })
            .catch(error => {
                console.error("Erro ao buscar tipos de imóveis", error)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchQtdTiposImoveis()
    }, [])

    return(
        <div className="w-3/12 h-32 shadow-md shadow-blue-300 flex flex-col rounded-lg border-2 border-gray-200 dark:border-white dark:bg-gray-800 p-4">
            <h2 className="text-xl font-bold mb-2 dark:text-white">Tipos de Imóveis</h2>
            <div className="flex-1 flex items-center justify-center">
                {loading ? (
                    <p className="text-center dark:text-gray-300">Carregando...</p>
                ) : (
                    <p className="text-center text-3xl font-bold dark:text-white">{qtdTiposImoveis}</p>
                )}
            </div>
        </div>
    )
}
