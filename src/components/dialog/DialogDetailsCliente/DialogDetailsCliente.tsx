import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { type ReactNode, useEffect } from "react"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"



interface DialogConfirmExcludeProps {
  children: ReactNode
}

export default function DialogDetailsCliente({ children }: DialogConfirmExcludeProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="border-gray-500 bg-white">
        <DialogHeader>
          <DialogTitle>Informações do cliente</DialogTitle>
          <div className="grid grid-cols-3 gap-4 mt-5 mb-5">
            <Field>
              <FieldLabel>Id</FieldLabel>
              <FieldDescription>1</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Nome</FieldLabel>
              <FieldDescription>uma</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldDescription>lucas@gmail.com</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Tipo</FieldLabel>
              <FieldDescription>testetipo</FieldDescription>
            </Field>

          </div>
          <div className="flex gap-3 w-4/5">
            <Button variant={"destructive"} className="bg-white-500 text-black border-2 hover:bg-gray-200 cursor-pointer">Fechar</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )

}
