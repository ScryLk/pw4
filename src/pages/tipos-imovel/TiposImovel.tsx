import Layout from "@/app/layout"
import TiposImovelTable from "@/components/tipos-imovel-table/TiposImovelTable"
import { type ColumnDef } from "@tanstack/react-table"


export default function TiposImovel() {
  return (
    <Layout>
      <div className="flex h-full w-full items-center flex-col text-sidebar-foreground justify-center p-4">
        <div className="w-4/5  max-h-4xl">
          <TiposImovelTable />
        </div>
      </div>
    </Layout>
  )
}