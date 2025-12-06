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
import axios from "axios"

interface DialogConfirmExcludeProps {
  children: ReactNode
  id: number
  endpoint: string
  onSuccess?: () => void
}

export default function DialogConfirmExclude({ children, id, endpoint, onSuccess }: DialogConfirmExcludeProps) {
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/${endpoint}/${id}`)
      setOpen(false)
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      alert('Erro ao excluir.')
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
            <Button onClick={handleDelete} variant={"destructive"} className="bg-red-500 text-white hover:bg-red-600 cursor-pointer">Confirmar</Button>
            <Button onClick={() => setOpen(false)} variant={"destructive"} className="bg-white-500 text-black border-2 hover:bg-gray-200 cursor-pointer">Cancelar</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )

}