import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Menu, Trash, Edit } from "lucide-react"
import { Button } from "../ui/button"
import DialogConfirmExclude from "../dialog/DialogConfirmExclude/DialogConfirmExclude"
import DialogDetailsCliente from "../dialog/DialogDetailsCliente/DialogDetailsCliente"
import { useEffect, useState } from "react"
import api from '@/services/api'

interface Cliente {
  nome: string
  email: string
  senha: string
  tipo: string
}



export default function ClienteTable() {
  const [dadosClientes, setDadosClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoading(true)
        const response = await api.get('/users')
        setDadosClientes(response.data)
        setError(null)
      } catch (error) {
        console.error('Erro ao buscar clientes:', error)
        setError(error instanceof Error ? error.message : 'Erro desconhecido')
        setDadosClientes([])
      } finally {
        setLoading(false)
      }
    }

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

  return (
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
          dadosClientes.map((cliente, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">{index + 1}</TableCell>
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
