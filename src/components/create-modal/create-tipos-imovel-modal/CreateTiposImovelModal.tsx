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
import { toast } from "sonner"
import axios from "axios"

interface TipoImovel {
  nome: string
  descricao: string
}

interface CreateTiposImovelModalProps {
  children: React.ReactNode
  onSubmit: (data: TipoImovel) => void
}

export default function CreateTiposImovelModal({ children, onSubmit }: CreateTiposImovelModalProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<TipoImovel>({
    nome: "",
    descricao: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await axios.post('http://localhost:8080/tipos-imoveis', formData)
      toast.success('Tipo de imóvel criado com sucesso!')
      onSubmit(formData)
      setOpen(false)
      setFormData({
        nome: "",
        descricao: "",
      })
    } catch (error) {
      console.error('Erro ao criar tipo de imóvel:', error)
      toast.error('Erro ao criar tipo de imóvel. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Criar Tipo de Imóvel</DialogTitle>
        </DialogHeader>

        <form className="bg-white" onSubmit={handleSubmit}>
          <div className="grid gap-4 bg-white py-4">
            <div className="grid bg-white gap-2">
              <label className="text-sm font-medium">Nome</label>
              <input
                type="text"
                placeholder="Digite o nome"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Descrição</label>
              <input
                type="text"
                placeholder="Digite a descrição"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-green-500 hover:bg-green-600">
              Criar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
