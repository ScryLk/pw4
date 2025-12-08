import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { type ReactNode, useState } from "react"
import { toast } from "sonner"
import api from "@/lib/axios"

interface DialogConfirmExcludeProps {
  children: ReactNode
  id: number
  endpoint: string
  onSuccess?: () => void
}

export default function DialogConfirmExclude({ children, id, endpoint, onSuccess }: DialogConfirmExcludeProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await api.delete(`/${endpoint}/${id}`)
      toast.success('Item excluído com sucesso!')
      setOpen(false)
      if (onSuccess) {
        onSuccess()
      }
    } catch (error: any) {
      console.error('Erro ao excluir:', error)

      if (error.response?.status === 401) {
        toast.error('Você precisa estar autenticado')
      } else if (error.response?.status === 403) {
        toast.error('Você não tem permissão para excluir este item')
      } else {
        toast.error('Erro ao excluir. Tente novamente.')
      }
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="border-red-500 bg-white">
        <DialogHeader>
          <DialogTitle>Você tem certeza que deseja excluir?</DialogTitle>
          <DialogDescription>
            Essa ação não pode ser desfeita
          </DialogDescription>
          <div className="flex gap-3 w-4/5">
            <Button
              onClick={handleDelete}
              variant={"destructive"}
              className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
              disabled={isDeleting}
            >
              {isDeleting ? 'Excluindo...' : 'Confirmar'}
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant={"destructive"}
              className="bg-white-500 text-black border-2 hover:bg-gray-200 cursor-pointer"
              disabled={isDeleting}
            >
              Cancelar
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )

}