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

interface Bairros {
  nome: string
  estado: string
  cidade: string
  cep_inicial: string
  cep_final: string
}



export default function BairrosTable() {
  const [dadosBairros, setDadosBairros] = useState<Bairros[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    const fetchBairros = async () => {
      try {
        setLoading(true)
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        const requestOptions: RequestInit = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        }

        const response = await fetch("http://localhost:8080/bairros", requestOptions)

        if (!response.ok) {
          throw new Error(`Erro ao buscar bairros: ${response.status}`)
        }

        const result: Bairros[] = await response.json()
        setDadosBairros(result)
        setError(null)
      } catch (error) {
        console.error("Erro ao buscar imóveis", error)
        setError(error instanceof Error ? error.message : "Erro desconhecido")
      } finally {
        setLoading(false)
      }
    }

    fetchBairros()
  }, [])
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
          dadosBairros.map((bairro, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">{index + 1}</TableCell>
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
