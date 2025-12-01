import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash, Edit} from "lucide-react"
import { Button } from "../ui/button"
import DialogConfirmExclude from "../dialog/DialogConfirmExclude/DialogConfirmExclude"

export default function TiposImovelTable() {
  return(
<Table>
  <TableCaption>Lista de tipos de imóvel</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[75px]">Id</TableHead>
      <TableHead className="w-[200px]">Nome</TableHead>
      <TableHead className="w-[300px]">Descrição</TableHead>
      <TableHead>Ações</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>1</TableCell>
      <TableCell>Apartamento</TableCell>
      <TableCell>Unidade residencial em edifício</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <DialogConfirmExclude>
            <Button size="icon" variant="destructive" className="w-7 h-7 bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer ">
              <Trash size={16} />
            </Button>
          </DialogConfirmExclude>
          <Button size="icon" variant="default" className="w-7 h-7 bg-yellow-500 hover:bg-yellow-600 rounded-lg cursor-pointer">
            <Edit size={16} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
  )

}
