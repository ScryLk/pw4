import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { type ReactNode } from "react"

interface DialogConfirmExcludeProps {
  children: ReactNode
}

export default function DialogConfirmExclude({ children }: DialogConfirmExcludeProps) {
  return (
    <Dialog>
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
            <Button variant={"destructive"} className="bg-red-500 text-white hover:bg-red-600 cursor-pointer">Confirmar</Button>
            <Button variant={"destructive"} className="bg-white-500 text-black border-2 hover:bg-gray-200 cursor-pointer">Cancelar</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )

}