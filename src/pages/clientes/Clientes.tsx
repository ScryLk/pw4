import Layout from "@/app/layout"
import ClienteTable from "@/components/clientes-table/ClienteTable"
import { type ColumnDef } from "@tanstack/react-table"


export default function Clientes() {
  return (
    <Layout>
      <div className="flex h-full w-full items-center flex-col text-sidebar-foreground justify-center p-4">
        <div className="w-4/5  max-h-4xl">
          <ClienteTable />
        </div>
      </div>
    </Layout>
  )
}
