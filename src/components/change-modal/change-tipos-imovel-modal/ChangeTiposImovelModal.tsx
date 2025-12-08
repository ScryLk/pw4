import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import api from "@/lib/axios"

interface TipoImovel {
  id: number
  nome: string
  descricao: string
}

interface ChangeTiposImovelModalProps {
  children: React.ReactNode
  tipoImovel: TipoImovel
}

export default function ChangeTiposImovelModal({ children, tipoImovel }: ChangeTiposImovelModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(tipoImovel)

  useEffect(() => {
    if (open) {
      setFormData(tipoImovel)
    }
  }, [open, tipoImovel])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.put(`/tipos-imoveis/${tipoImovel.id}`, formData)
      setOpen(false)
    } catch (error) {
      alert('Erro ao atualizar tipo de imóvel.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Editar Tipo de Imóvel</DialogTitle>
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
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600">
              Atualizar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
