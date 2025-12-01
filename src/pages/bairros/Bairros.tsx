import Layout from "@/app/layout"
import { type ColumnDef } from "@tanstack/react-table"
import BairrosTable from "@/components/bairros-table/BairrosTable"



export default function Bairros() {
  return (
    <Layout>
      <div className="flex h-full w-full items-center flex-col text-sidebar-foreground justify-center p-4">
        <div className="w-4/5  max-h-4xl">
          <BairrosTable />
        </div>
      </div>
    </Layout>
  )
}
