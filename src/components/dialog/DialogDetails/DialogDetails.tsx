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

export default function DialogDetails({ children }: DialogConfirmExcludeProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="border-gray-500 bg-white">
        <DialogHeader>
          <DialogTitle>Informações do imovel</DialogTitle>
          <div className="grid grid-cols-3 gap-4 mt-5 mb-5">
            <Field>
              <FieldLabel>Id</FieldLabel>
              <FieldDescription>123</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Título</FieldLabel>
              <FieldDescription>Casa Moderna</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Descrição</FieldLabel>
              <FieldDescription>Casa ampla com 3 quartos</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Preco Venda</FieldLabel>
              <FieldDescription>R$123</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Preco Aluguel</FieldLabel>
              <FieldDescription>R$123</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Id</FieldLabel>
              <FieldDescription>123</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Finalidade</FieldLabel>
              <FieldDescription>a</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Status</FieldLabel>
              <FieldDescription>A venda</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Dormitorios</FieldLabel>
              <FieldDescription>123</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Banheiros</FieldLabel>
              <FieldDescription>123</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Garagem</FieldLabel>
              <FieldDescription>123</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Area Total</FieldLabel>
              <FieldDescription>123</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Area Construida</FieldLabel>
              <FieldDescription>123</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Endereço</FieldLabel>
              <FieldDescription>123</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Numero</FieldLabel>
              <FieldDescription>123</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Complemento</FieldLabel>
              <FieldDescription>123</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>CEP</FieldLabel>
              <FieldDescription>123</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Caracteristicas</FieldLabel>
              <FieldDescription>123</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Destaque</FieldLabel>
              <FieldDescription>123</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Tipo Imovel</FieldLabel>
              <FieldDescription>123</FieldDescription>
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