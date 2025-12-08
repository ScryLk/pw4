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

interface Bairros {
  id: number
  nome: string
  estado: string
  cidade: string
  cep_inicial: string
  cep_final: string
}

interface ChangeBairrosModalProps {
  children: React.ReactNode
  bairro: Bairros
}

export default function ChangeBairrosModal({ children, bairro }: ChangeBairrosModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(bairro)

  useEffect(() => {
    if (open) {
      setFormData(bairro)
    }
  }, [open, bairro])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.put(`/bairros/${bairro.id}`, formData)
      setOpen(false)
    } catch (error) {
      alert('Erro ao atualizar bairro.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Editar Bairro</DialogTitle>
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
                onChange={(e) => setFormData({ id: formData.id, nome: e.target.value, estado: formData.estado, cidade: formData.cidade, cep_inicial: formData.cep_inicial, cep_final: formData.cep_final })}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Estado</label>
              <input
                type="text"
                placeholder="Digite o estado"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.estado}
                onChange={(e) => setFormData({ id: formData.id, nome: formData.nome, estado: e.target.value, cidade: formData.cidade, cep_inicial: formData.cep_inicial, cep_final: formData.cep_final })}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Cidade</label>
              <input
                type="text"
                placeholder="Digite a cidade"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.cidade}
                onChange={(e) => setFormData({ id: formData.id, nome: formData.nome, estado: formData.estado, cidade: e.target.value, cep_inicial: formData.cep_inicial, cep_final: formData.cep_final })}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">CEP Inicial</label>
              <input
                type="text"
                placeholder="00000-000"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.cep_inicial}
                onChange={(e) => setFormData({ id: formData.id, nome: formData.nome, estado: formData.estado, cidade: formData.cidade, cep_inicial: e.target.value, cep_final: formData.cep_final })}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">CEP Final</label>
              <input
                type="text"
                placeholder="99999-999"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.cep_final}
                onChange={(e) => setFormData({ id: formData.id, nome: formData.nome, estado: formData.estado, cidade: formData.cidade, cep_inicial: formData.cep_inicial, cep_final: e.target.value })}
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
