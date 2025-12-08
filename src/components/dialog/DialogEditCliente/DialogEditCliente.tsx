import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { type ReactNode, useState, useEffect } from "react"
import { toast } from "sonner"
import api from "@/lib/axios"

interface Cliente {
  id: number
  nome: string
  email: string
  tipo: string
}

interface DialogEditClienteProps {
  children: ReactNode
  cliente: Cliente
  onSuccess?: () => void
}

export default function DialogEditCliente({ children, cliente, onSuccess }: DialogEditClienteProps) {
  const [open, setOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [formData, setFormData] = useState({
    nome: cliente.nome,
    email: cliente.email,
    tipo: cliente.tipo,
    senha: "",
  })

  useEffect(() => {
    if (open) {
      setFormData({
        nome: cliente.nome,
        email: cliente.email,
        tipo: cliente.tipo,
        senha: "",
      })
    }
  }, [open, cliente])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    try {
      // Validação básica
      if (!formData.nome || !formData.email) {
        toast.error("Nome e email são obrigatórios")
        setIsUpdating(false)
        return
      }

      // Validação de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        toast.error("Por favor, insira um email válido")
        setIsUpdating(false)
        return
      }

      // Validação de senha (se informada)
      if (formData.senha && formData.senha.length < 6) {
        toast.error("A senha deve ter no mínimo 6 caracteres")
        setIsUpdating(false)
        return
      }

      // Prepara dados para enviar
      const dataToSend: any = {
        nome: formData.nome,
        email: formData.email,
        tipo: formData.tipo,
      }

      // Só envia senha se foi preenchida
      if (formData.senha) {
        dataToSend.senha = formData.senha
      }

      await api.put(`/users/${cliente.id}`, dataToSend)

      toast.success("Cliente atualizado com sucesso!")
      setOpen(false)
      if (onSuccess) {
        onSuccess()
      }
    } catch (error: any) {
      console.error('Erro ao atualizar cliente:', error)

      if (error.response?.status === 409) {
        toast.error("Este email já está cadastrado")
      } else if (error.response?.status === 401) {
        toast.error("Você precisa estar autenticado")
      } else if (error.response?.status === 403) {
        toast.error("Você não tem permissão para editar este cliente")
      } else {
        toast.error("Erro ao atualizar cliente. Tente novamente.")
      }
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
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
                Nova Senha <span className="text-gray-500">(deixe em branco para manter a atual)</span>
              </label>
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
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
              disabled={isUpdating}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600"
              disabled={isUpdating}
            >
              {isUpdating ? "Atualizando..." : "Atualizar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
