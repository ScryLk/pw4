import Layout from "@/app/layout"
import ImovelTable from "@/components/imoveis-table/ImovelTable"
import { type ColumnDef } from "@tanstack/react-table"


export default function Imoveis() {
  return (
    <Layout>
      <div className="flex h-full w-full items-center flex-col text-sidebar-foreground justify-center">
        <div className="w-11/12 pl-20  max-h-4xl">
          <ImovelTable />
        </div>
      </div>
    </Layout>
  )
}