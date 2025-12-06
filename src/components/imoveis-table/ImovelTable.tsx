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
import { Menu, Trash, Edit} from "lucide-react"
import { Button } from "../ui/button"
import DialogConfirmExclude from "../dialog/DialogConfirmExclude/DialogConfirmExclude"
import DialogDetails from "../dialog/DialogDetails/DialogDetails"
import CreateImoveisModal from "../create-modal/create-imoveis-modal/CreateImoveisModal"
import ChangeImoveisModal from "../change-modal/change-imoveis-modal/ChangeImoveisModal"

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



export default function ImovelTable() {
  const [dadosImoveis, setDadosImoveis] = useState<Imovel[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchImoveis = async () => {
    try {
      setLoading(true)
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      }

      const response = await fetch("http://localhost:8080/imoveis", requestOptions)

      if (!response.ok) {
        throw new Error(`Erro ao buscar imóveis: ${response.status}`)
      }

      const result: Imovel[] = await response.json()
      setDadosImoveis(result)
      setError(null)
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error)
      setError(error instanceof Error ? error.message : "Erro desconhecido")
      setDadosImoveis([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImoveis()
  }, [])

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
    </div>
  )

}
