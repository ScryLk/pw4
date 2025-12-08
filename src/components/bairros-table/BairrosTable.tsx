import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Menu, Trash, Edit, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import DialogConfirmExclude from "../dialog/DialogConfirmExclude/DialogConfirmExclude"
import DialogDetailsCliente from "../dialog/DialogDetailsCliente/DialogDetailsCliente"
import { useEffect, useState } from "react"
import CreateModal from "../create-modal/create-bairros-modal/CreateModal"
import ChangeBairrosModal from "../change-modal/change-bairos-modal/ChangeBairrosModal"
import { toast } from "sonner"

interface Bairros {
  id: number
  nome: string
  estado: string
  cidade: string
  cep_inicial: string
  cep_final: string
}

interface PaginatedResponse {
  content: Bairros[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}

export default function BairrosTable() {
  const [dadosBairros, setDadosBairros] = useState<Bairros[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)

  const fetchBairros = async () => {
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

      const response = await fetch(`http://localhost:8080/bairros/bairros-page?page=${page}&size=10&sort=id`, requestOptions)

      if (!response.ok) {
        throw new Error(`Erro ao buscar bairros: ${response.status}`)
      }

      const result: PaginatedResponse = await response.json()
      setDadosBairros(result.content)
      setTotalPages(result.totalPages)
      setError(null)
    } catch (error) {
      console.error("Erro ao buscar bairros", error)
      toast.error("Erro ao carregar os dados dos bairros")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBairros()
  }, [page])
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-500">Carregando bairros...</p>
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
    <div>

      <div className="flex justify-end items-end ">
        <div className="bg-green-500 hover:bg-green-600 rounded-md">
          <CreateModal
            onSubmit={fetchBairros}
          >
            <Button className="w-24 text-white font-bold">Criar</Button>
          </CreateModal>
        </div>

      </div>
      <Table>

        <TableCaption>Lista de bairros</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[75px] text-center">Id</TableHead>
            <TableHead className="w-[200px] text-center">Nome</TableHead>
            <TableHead className="w-[300px] text-center">Estado</TableHead>
            <TableHead className="w-[100px] text-center">Cidade</TableHead>
            <TableHead className="w-[150px] text-center">Cep Inicial</TableHead>
            <TableHead className="w-[150px] text-center">Cep Final</TableHead>
            <TableHead className="w-[150px] text-center">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dadosBairros.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500">
                Nenhum bairro encontrado
              </TableCell>
            </TableRow>
          ) : (
            dadosBairros.map((bairro) => (
              <TableRow key={bairro.id}>
                <TableCell className="text-center">{bairro.id}</TableCell>
                <TableCell className="text-center">{bairro.nome}</TableCell>
                <TableCell className="text-center">{bairro.estado}</TableCell>
                <TableCell className="text-center">{bairro.cidade}</TableCell>
                <TableCell className="text-center">{bairro.cep_inicial}</TableCell>
                <TableCell className="text-center">{bairro.cep_final}</TableCell>
                <TableCell>
                  <div className="gap-4 flex pl-20">
                    <DialogDetailsCliente>
                      <Button size="icon" variant="default" className="w-7 h-7 bg-gray-500 hover:bg-gray-600 rounded-lg cursor-pointer">
                        <Menu color="white" size={16} />
                      </Button>
                    </DialogDetailsCliente>
                    <DialogConfirmExclude
                      id={bairro.id}
                      endpoint="bairros"
                      onSuccess={fetchBairros}
                    >
                      <Button size="icon" variant="destructive" className="w-7 h-7 bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer">
                        <Trash size={16} />
                      </Button>
                    </DialogConfirmExclude>
                    <ChangeBairrosModal bairro={bairro}>
                      <Button size="icon" variant="default" className="w-7 h-7 bg-yellow-500 hover:bg-yellow-600 rounded-lg cursor-pointer">
                        <Edit size={16} />
                      </Button>
                    </ChangeBairrosModal>
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