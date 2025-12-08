import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { type ReactNode } from "react"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"

interface Imovel {
  id: number
  titulo: string
  descricao: string
  preco_venda?: number
  preco_aluguel?: number
  finalidade: string
  status: string
  dormitorios?: number
  banheiros?: number
  garagem?: number
  area_total?: number
  area_construida?: number
  endereco?: string
  numero?: string
  complemento?: string
  cep?: string
  caracteristicas?: string
  destaque?: boolean
  id_tipo_imovel?: number
  nome_tipo_imovel?: string
  id_bairro?: number
  nome_bairro?: string
  cidade_bairro?: string
  estado_bairro?: string
}

interface DialogDetailsProps {
  children: ReactNode
  imovel?: Imovel
}

export default function DialogDetails({ children, imovel }: DialogDetailsProps) {
  const formatCurrency = (value?: number) => {
    if (!value) return "N/A"
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="border-gray-500 bg-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Informações do Imóvel</DialogTitle>
          <div className="grid grid-cols-3 gap-4 mt-5 mb-5">
            <Field>
              <FieldLabel>ID</FieldLabel>
              <FieldDescription>{imovel?.id || "N/A"}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Título</FieldLabel>
              <FieldDescription>{imovel?.titulo || "N/A"}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Status</FieldLabel>
              <FieldDescription>{imovel?.status || "N/A"}</FieldDescription>
            </Field>
            <Field className="col-span-3">
              <FieldLabel>Descrição</FieldLabel>
              <FieldDescription>{imovel?.descricao || "N/A"}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Preço Venda</FieldLabel>
              <FieldDescription>{formatCurrency(imovel?.preco_venda)}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Preço Aluguel</FieldLabel>
              <FieldDescription>{formatCurrency(imovel?.preco_aluguel)}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Finalidade</FieldLabel>
              <FieldDescription>{imovel?.finalidade || "N/A"}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Dormitórios</FieldLabel>
              <FieldDescription>{imovel?.dormitorios || "N/A"}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Banheiros</FieldLabel>
              <FieldDescription>{imovel?.banheiros || "N/A"}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Garagem</FieldLabel>
              <FieldDescription>{imovel?.garagem || "N/A"}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Área Total</FieldLabel>
              <FieldDescription>{imovel?.area_total ? `${imovel.area_total} m²` : "N/A"}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Área Construída</FieldLabel>
              <FieldDescription>{imovel?.area_construida ? `${imovel.area_construida} m²` : "N/A"}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Tipo de Imóvel</FieldLabel>
              <FieldDescription>{imovel?.nome_tipo_imovel || "N/A"}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Endereço</FieldLabel>
              <FieldDescription>{imovel?.endereco || "N/A"}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Número</FieldLabel>
              <FieldDescription>{imovel?.numero || "N/A"}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Complemento</FieldLabel>
              <FieldDescription>{imovel?.complemento || "N/A"}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>CEP</FieldLabel>
              <FieldDescription>{imovel?.cep || "N/A"}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Bairro</FieldLabel>
              <FieldDescription>{imovel?.nome_bairro || "N/A"}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Cidade</FieldLabel>
              <FieldDescription>{imovel?.cidade_bairro || "N/A"}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Estado</FieldLabel>
              <FieldDescription>{imovel?.estado_bairro || "N/A"}</FieldDescription>
            </Field>
            <Field className="col-span-2">
              <FieldLabel>Características</FieldLabel>
              <FieldDescription>{imovel?.caracteristicas || "N/A"}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Destaque</FieldLabel>
              <FieldDescription>{imovel?.destaque ? "Sim" : "Não"}</FieldDescription>
            </Field>
          </div>
          <div className="flex gap-3 justify-end">
            <DialogClose asChild>
              <Button variant="outline" className="border-2 hover:bg-gray-100 cursor-pointer">
                Fechar
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )

}