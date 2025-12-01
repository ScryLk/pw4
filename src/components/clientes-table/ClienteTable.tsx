import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Menu, Trash, Edit} from "lucide-react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import DialogConfirmExclude from "../dialog/DialogConfirmExclude/DialogConfirmExclude"
import DialogDetailsCliente from "../dialog/DialogDetailsCliente/DialogDetailsCliente"

export default function ClienteTable() {
  return(
<Table>
  <TableCaption>Lista de clientes</TableCaption>
  <TableHeader>
    <TableRow>

      <TableHead className="w-[75px] text-center">Id</TableHead>
      <TableHead className="w-[200px] text-center">Nome</TableHead>
      <TableHead className="w-[300px] text-center">Email</TableHead>
      <TableHead className="w-[100px] text-center">Tipo</TableHead>
      <TableHead className="w-[150px] text-center">Ação</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>1</TableCell>
      <TableCell>uma</TableCell>
      <TableCell>lucas@gmail.com</TableCell>
      <TableCell>testetipo</TableCell>
  <TableCell>
  <div className="gap-4 flex pl-20">
    <DialogDetailsCliente>
      <Button size="icon" variant="default" className="w-7 h-7 bg-gray-500 hover:bg-gray-600 rounded-lg  cursor-pointer ">
        <Menu color="white" size={16} />
      </Button>
    </DialogDetailsCliente>
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
