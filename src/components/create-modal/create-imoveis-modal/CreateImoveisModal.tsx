import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import axios from "axios"

interface ImovelDTO {
  titulo: string
  descricao: string
  finalidade: string
  status: string
  tipoImovelId: number
  bairroId: number
  preco_venda?: number
  preco_aluguel?: number
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
}

interface CreateImoveisModalProps {
  children: React.ReactNode
  onSubmit: (data: ImovelDTO) => void
}

export default function CreateImoveisModal({ children, onSubmit }: CreateImoveisModalProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ImovelDTO>({
    titulo: "",
    descricao: "",
    finalidade: "VENDA",
    status: "ATIVO",
    tipoImovelId: 0,
    bairroId: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await axios.post('http://localhost:8080/imoveis', formData)
      onSubmit(formData)
      setOpen(false)
      setFormData({
        titulo: "",
        descricao: "",
        finalidade: "VENDA",
        status: "ATIVO",
        tipoImovelId: 0,
        bairroId: 0,
      })
    } catch (error) {
      console.error('Erro ao criar imóvel:', error)
      alert('Erro ao criar imóvel. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Criar Imóvel</DialogTitle>
        </DialogHeader>

        <form className="bg-white" onSubmit={handleSubmit}>
          <div className="grid gap-4 bg-white py-4">
            <div className="grid bg-white gap-2">
              <label className="text-sm font-medium">Título *</label>
              <input
                type="text"
                placeholder="Digite o título"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Descrição *</label>
              <textarea
                placeholder="Digite a descrição"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Finalidade *</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.finalidade}
                  onChange={(e) => setFormData({ ...formData, finalidade: e.target.value })}
                  required
                >
                  <option value="VENDA">Venda</option>
                  <option value="ALUGUEL">Aluguel</option>
                  <option value="AMBOS">Ambos</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Status *</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                >
                  <option value="ATIVO">Ativo</option>
                  <option value="INATIVO">Inativo</option>
                  <option value="VENDIDO">Vendido</option>
                  <option value="ALUGADO">Alugado</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Tipo de Imóvel *</label>
                <input
                  type="number"
                  placeholder="ID do tipo"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.tipoImovelId || ''}
                  onChange={(e) => setFormData({ ...formData, tipoImovelId: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Bairro *</label>
                <input
                  type="number"
                  placeholder="ID do bairro"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.bairroId || ''}
                  onChange={(e) => setFormData({ ...formData, bairroId: Number(e.target.value) })}
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-green-500 hover:bg-green-600">
              {isLoading ? 'Criando...' : 'Criar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}