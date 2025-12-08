import Layout from "@/app/layout"
import ImovelTable from "@/components/imoveis-table/ImovelTable"
import { type ColumnDef } from "@tanstack/react-table"


export default function Imoveis() {
  return (
    <Layout>
      <div className="flex h-full w-full items-center flex-col text-sidebar-foreground justify-center p-4">
        <div className="w-4/5  max-h-4xl">
          <ImovelTable />
        </div>
      </div>
    </Layout>
  )
}