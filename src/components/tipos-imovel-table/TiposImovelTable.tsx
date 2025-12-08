import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash, Edit, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import DialogConfirmExclude from "../dialog/DialogConfirmExclude/DialogConfirmExclude"
import { useEffect, useState } from "react"
import CreateTiposImovelModal from "../create-modal/create-tipos-imovel-modal/CreateTiposImovelModal"
import ChangeTiposImovelModal from "../change-modal/change-tipos-imovel-modal/ChangeTiposImovelModal"
import { toast } from "sonner"

interface TipoImovel {
  id: number
  nome: string
  descricao: string
}

interface PaginatedResponse {
  content: TipoImovel[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}

export default function TiposImovelTable() {
  const [dadosTipos, setDadosTipos] = useState<TipoImovel[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)

  const fetchTiposImovel = async () => {
    try {
      setLoading(true)
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")
      myHeaders.append("Accept", "application/json")

      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
      }

      const response = await fetch(`http://localhost:8080/tipos-imoveis/tipos-page?page=${page}&size=10&sort=id`, requestOptions)

      if (!response.ok) {
        throw new Error(`Erro ao buscar tipos de imóvel: ${response.status}`)
      }

      const result: PaginatedResponse = await response.json()
      setDadosTipos(result.content)
      setTotalPages(result.totalPages)
      setError(null)
    } catch (error) {
      console.error("Erro ao buscar tipos de imóvel", error)
      setError(error instanceof Error ? error.message : "Erro desconhecido")
      toast.error("Erro ao carregar os dados dos tipos de imóvel")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTiposImovel()
  }, [page])

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-500">Carregando tipos de imóvel...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-end items-end ">
        <div className="bg-green-500 hover:bg-green-600 rounded-md">
          <CreateTiposImovelModal
            onSubmit={fetchTiposImovel}
          >
            <Button className="w-24 text-white font-bold">Criar</Button>
          </CreateTiposImovelModal>
        </div>
      </div>
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
            dadosTipos.map((tipo) => (
              <TableRow key={tipo.id}>
                <TableCell className="text-center">{tipo.id}</TableCell>
                <TableCell className="text-center">{tipo.nome}</TableCell>
                <TableCell className="text-center">{tipo.descricao}</TableCell>
                <TableCell>
                  <div className="gap-4 flex justify-center">
                    <DialogConfirmExclude
                      id={tipo.id}
                      endpoint="tipos-imoveis"
                      onSuccess={fetchTiposImovel}
                    >
                      <Button size="icon" variant="destructive" className="w-7 h-7 bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer">
                        <Trash size={16} />
                      </Button>
                    </DialogConfirmExclude>
                    <ChangeTiposImovelModal tipoImovel={tipo}>
                      <Button size="icon" variant="default" className="w-7 h-7 bg-yellow-500 hover:bg-yellow-600 rounded-lg cursor-pointer">
                        <Edit size={16} />
                      </Button>
                    </ChangeTiposImovelModal>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-600">
          Página {page + 1} de {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages - 1}
          >
            Próxima
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
