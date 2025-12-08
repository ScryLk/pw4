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
import DialogEditCliente from "../dialog/DialogEditCliente/DialogEditCliente"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface Cliente {
  id: number
  nome: string
  email: string
  senha: string
  tipo: string
}

export default function ClienteTable() {
  const [todosClientes, setTodosClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState<number>(0)
  const itemsPerPage = 10

  const fetchClientes = async () => {
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

      const response = await fetch(`http://localhost:8080/users`, requestOptions)

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Você precisa estar autenticado para acessar esta página')
        }
        throw new Error(`Erro ao buscar clientes: ${response.status}`)
      }

      const result: Cliente[] = await response.json()
      setTodosClientes(result)
      setError(null)
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
      setError(error instanceof Error ? error.message : 'Erro desconhecido')
      setTodosClientes([])
      toast.error(error instanceof Error ? error.message : "Erro ao carregar os dados dos clientes")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClientes()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-500">Carregando clientes...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  const totalPages = Math.ceil(todosClientes.length / itemsPerPage)
  const startIndex = page * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const dadosClientes = todosClientes.slice(startIndex, endIndex)

  return (
    <div>
      <Table>
        <TableCaption>Lista de clientes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[75px] text-center">Id</TableHead>
            <TableHead className="w-[200px] text-center">Nome</TableHead>
            <TableHead className="w-[300px] text-center">Email</TableHead>
            <TableHead className="w-[100px] text-center">Tipo</TableHead>
            <TableHead className="w-[150px] text-center">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dadosClientes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                Nenhum cliente encontrado
              </TableCell>
            </TableRow>
          ) : (
            dadosClientes.map((cliente: Cliente) => (
              <TableRow key={cliente.id}>
                <TableCell className="text-center">{cliente.id}</TableCell>
                <TableCell className="text-center">{cliente.nome}</TableCell>
                <TableCell className="text-center">{cliente.email}</TableCell>
                <TableCell className="text-center">{cliente.tipo}</TableCell>
                <TableCell>
                  <div className="gap-4 flex pl-20">
                    <DialogDetailsCliente>
                      <Button size="icon" variant="default" className="w-7 h-7 bg-gray-500 hover:bg-gray-600 rounded-lg cursor-pointer">
                        <Menu color="white" size={16} />
                      </Button>
                    </DialogDetailsCliente>
                    <DialogConfirmExclude
                      id={cliente.id}
                      endpoint="users"
                      onSuccess={fetchClientes}
                    >
                      <Button size="icon" variant="destructive" className="w-7 h-7 bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer">
                        <Trash size={16} />
                      </Button>
                    </DialogConfirmExclude>
                    <DialogEditCliente
                      cliente={cliente}
                      onSuccess={fetchClientes}
                    >
                      <Button size="icon" variant="default" className="w-7 h-7 bg-yellow-500 hover:bg-yellow-600 rounded-lg cursor-pointer">
                        <Edit size={16} />
                      </Button>
                    </DialogEditCliente>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-600">
          Página {page + 1} de {totalPages || 1}
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
            disabled={page >= totalPages - 1 || totalPages === 0}
          >
            Próxima
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
