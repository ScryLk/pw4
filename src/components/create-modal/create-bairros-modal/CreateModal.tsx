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

interface Bairros {
  nome: string
  estado: string
  cidade: string
  cep_inicial: string
  cep_final: string
}

interface CreateModalProps {
  children: React.ReactNode
  onSubmit: (data: Bairros) => void
}

export default function CreateModal({ children, onSubmit }: CreateModalProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Bairros>({
    nome: "",
    estado: "",
    cidade: "",
    cep_inicial: "",
    cep_final: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await axios.post('http://localhost:8080/bairros', formData)
      onSubmit(formData)
      setOpen(false)
      setFormData({
        nome: "",
        estado: "",
        cidade: "",
        cep_inicial: "",
        cep_final: "",
      })
    } catch (error) {
      console.error('Erro ao criar bairro:', error)
      alert('Erro ao criar bairro. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Criar Bairro</DialogTitle>
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
                onChange={(e) => setFormData({ nome: e.target.value, estado: formData.estado, cidade: formData.cidade, cep_inicial: formData.cep_inicial, cep_final: formData.cep_final })}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Estado</label>
              <input
                type="text"
                placeholder="Digite o estado"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Cidade</label>
              <input
                type="text"
                placeholder="Digite a cidade"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.cidade}
                onChange={(e) => setFormData({ nome: formData.nome, estado: formData.estado, cidade: e.target.value, cep_inicial: formData.cep_inicial, cep_final: formData.cep_final })}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">CEP Inicial</label>
              <input
                type="text"
                placeholder="00000-000"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.cep_inicial}
                onChange={(e) => setFormData({ nome: formData.nome, estado: formData.estado, cidade: formData.cidade, cep_inicial: e.target.value, cep_final: formData.cep_final })}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">CEP Final</label>
              <input
                type="text"
                placeholder="99999-999"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.cep_final}
                onChange={(e) => setFormData({ nome: formData.nome, estado: formData.estado, cidade: formData.cidade, cep_inicial: formData.cep_inicial, cep_final: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit"  className="bg-green-500 hover:bg-green-600">
              Criar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
