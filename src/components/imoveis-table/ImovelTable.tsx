import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Menu, Trash, Edit, ChevronLeft, ChevronRight} from "lucide-react"
import { Button } from "../ui/button"
import DialogConfirmExclude from "../dialog/DialogConfirmExclude/DialogConfirmExclude"
import DialogDetails from "../dialog/DialogDetails/DialogDetails"
import CreateImoveisModal from "../create-modal/create-imoveis-modal/CreateImoveisModal"
import ChangeImoveisModal from "../change-modal/change-imoveis-modal/ChangeImoveisModal"
import { toast } from "sonner"

interface Imovel {
  id: number
  titulo: string
  descricao: string
  preco_venda?: number
  preco_aluguel?: number
  finalidade: string
  status: string
  dormitorios?: number
  banheiros?: number
  garagem?: number
  area_total?: number
  area_construida?: number
  endereco?: string
  numero?: string
  complemento?: string
  cep?: string
  caracteristicas?: string
  destaque?: boolean
  id_tipo_imovel?: number
  nome_tipo_imovel?: string
  id_bairro?: number
  nome_bairro?: string
  cidade_bairro?: string
  estado_bairro?: string
  id_usuario?: number
  nome_usuario?: string
  email_usuario?: string
}

interface PaginatedResponse {
  content: Imovel[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}

export default function ImovelTable() {
  const [dadosImoveis, setDadosImoveis] = useState<Imovel[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)

  const fetchImoveis = async () => {
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

      const response = await fetch(`http://localhost:8080/imoveis/imoveis-page?page=${page}&size=10&sort=id`, requestOptions)

      if (!response.ok) {
        throw new Error(`Erro ao buscar imóveis: ${response.status}`)
      }

      const result: PaginatedResponse = await response.json()
      setDadosImoveis(result.content)
      setTotalPages(result.totalPages)
      setError(null)
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error)
      setDadosImoveis([])
      toast.error("Erro ao carregar os dados dos imóveis")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImoveis()
  }, [page])

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-500">Carregando imóveis...</p>
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

  return(
    <div>
      <div className="flex justify-end items-end ">
        <div className="bg-green-500 hover:bg-green-600 rounded-md">
          <CreateImoveisModal
            onSubmit={fetchImoveis}
          >
            <Button className="w-24 text-white font-bold">Criar</Button>
          </CreateImoveisModal>
        </div>
      </div>
      <Table>
        <TableCaption>Lista de imoveis</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[75px] text-center">Id</TableHead>
            <TableHead className="w-[200px] text-center">Título</TableHead>
            <TableHead className="w-[300px] text-center">Descrição</TableHead>
            <TableHead className="w-[100px] text-center">Status</TableHead>
            <TableHead className="w-[150px] text-center">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dadosImoveis.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                Nenhum imóvel encontrado
              </TableCell>
            </TableRow>
          ) : (
            dadosImoveis.map((imovel) => (
              <TableRow key={imovel.id}>
                <TableCell className="text-center">{imovel.id}</TableCell>
                <TableCell className="text-center">{imovel.titulo}</TableCell>
                <TableCell className="text-center">{imovel.descricao}</TableCell>
                <TableCell className="text-center">{imovel.status}</TableCell>
                <TableCell>
                  <div className="gap-4 flex pl-20">
                    <DialogDetails>
                      <Button size="icon" variant="default" className="w-7 h-7 bg-gray-500 hover:bg-gray-600 rounded-lg  cursor-pointer ">
                        <Menu color="white" size={16} />
                      </Button>
                    </DialogDetails>
                    <DialogConfirmExclude
                      id={imovel.id}
                      endpoint="imoveis"
                      onSuccess={fetchImoveis}
                    >
                      <Button size="icon" variant="destructive" className="w-7 h-7 bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer ">
                        <Trash size={16} />
                      </Button>
                    </DialogConfirmExclude>
                    <ChangeImoveisModal imovel={imovel}>
                      <Button size="icon" variant="default" className="w-7 h-7 bg-yellow-500 hover:bg-yellow-600 rounded-lg cursor-pointer">
                        <Edit size={16} />
                      </Button>
                    </ChangeImoveisModal>
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
