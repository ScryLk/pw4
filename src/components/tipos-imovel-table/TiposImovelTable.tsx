import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash, Edit } from "lucide-react"
import { Button } from "../ui/button"
import DialogConfirmExclude from "../dialog/DialogConfirmExclude/DialogConfirmExclude"
import { useEffect, useState } from "react"

interface TipoImovel {
  nome: string
  descricao: string
}

export default function TiposImovelTable() {
  const [dadosTipos, setDadosTipos] = useState<TipoImovel[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTiposImovel = async () => {
      try {
        setLoading(true)
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        const requestOptions: RequestInit = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        }

        const response = await fetch("http://localhost:8080/tipos-imoveis/tipos-page", requestOptions)

        if (!response.ok) {
          throw new Error(`Erro ao buscar tipos de imóvel: ${response.status}`)
        }

        const result = await response.json()
        // Verifica se o resultado é um array ou um objeto com a propriedade content
        const dados = Array.isArray(result) ? result : result.content || []
        setDadosTipos(dados)
        setError(null)
      } catch (error) {
        console.error("Erro ao buscar tipos de imóvel", error)
        setError(error instanceof Error ? error.message : "Erro desconhecido")
      } finally {
        setLoading(false)
      }
    }

    fetchTiposImovel()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-500">Carregando tipos de imóvel...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-red-500">Erro: {error}</p>
      </div>
    )
  }

  return (
    <Table>
      <TableCaption>Lista de tipos de imóvel</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[75px] text-center">Id</TableHead>
          <TableHead className="w-[200px] text-center">Nome</TableHead>
          <TableHead className="w-[300px] text-center">Descrição</TableHead>
          <TableHead className="text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dadosTipos.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-gray-500">
              Nenhum tipo de imóvel encontrado
            </TableCell>
          </TableRow>
        ) : (
          dadosTipos.map((tipo, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">{tipo.nome}</TableCell>
              <TableCell className="text-center">{tipo.descricao}</TableCell>
              <TableCell>
                <div className="flex gap-2 justify-center">
                  <DialogConfirmExclude>
                    <Button size="icon" variant="destructive" className="w-7 h-7 bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer">
                      <Trash size={16} />
                    </Button>
                  </DialogConfirmExclude>
                  <Button size="icon" variant="default" className="w-7 h-7 bg-yellow-500 hover:bg-yellow-600 rounded-lg cursor-pointer">
                    <Edit size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
