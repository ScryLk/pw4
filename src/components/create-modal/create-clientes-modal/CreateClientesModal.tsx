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
import api from "@/lib/axios"

interface ClienteDTO {
  nome: string
  email: string
  senha: string
  tipo: string
}

interface CreateClientesModalProps {
  children: React.ReactNode
  onSuccess: () => void
}

export default function CreateClientesModal({ children, onSuccess }: CreateClientesModalProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ClienteDTO>({
    nome: "",
    email: "",
    senha: "",
    tipo: "CORRETOR",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validação básica
      if (!formData.nome || !formData.email || !formData.senha) {
        toast.error("Por favor, preencha todos os campos obrigatórios")
        setIsLoading(false)
        return
      }

      // Validação de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        toast.error("Por favor, insira um email válido")
        setIsLoading(false)
        return
      }

      // Validação de senha
      if (formData.senha.length < 6) {
        toast.error("A senha deve ter no mínimo 6 caracteres")
        setIsLoading(false)
        return
      }

      await api.post('/users', formData)

      toast.success("Cliente cadastrado com sucesso!")
      onSuccess()
      setOpen(false)
      setFormData({
        nome: "",
        email: "",
        senha: "",
        tipo: "CORRETOR",
      })
    } catch (error: any) {
      console.error('Erro ao criar cliente:', error)

      if (error.response?.status === 409) {
        toast.error("Este email já está cadastrado")
      } else if (error.response?.status === 401) {
        toast.error("Você precisa estar autenticado")
      } else if (error.response?.status === 403) {
        toast.error("Você não tem permissão para criar clientes")
      } else {
        toast.error("Erro ao criar cliente. Tente novamente.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Criar Cliente</DialogTitle>
        </DialogHeader>

        <form className="bg-white" onSubmit={handleSubmit}>
          <div className="grid gap-4 bg-white py-4">
            <div className="grid bg-white gap-2">
              <label className="text-sm font-medium">
                Nome <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Digite o nome completo"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="exemplo@email.com"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">
                Senha <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                required
                minLength={6}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">
                Tipo <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                required
              >
                <option value="CORRETOR">Corretor</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? "Criando..." : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
