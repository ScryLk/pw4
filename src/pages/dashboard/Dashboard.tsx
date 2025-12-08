import Layout from "@/app/layout"
import BairrosCards from "@/components/dashboard-cards/bairros-cards/BairrosCards"
import ClientesCards from "@/components/dashboard-cards/clientes-cards/ClientesCards"
import ImoveisCards from "@/components/dashboard-cards/imoveis-cards/ImoveisCards"
import TiposImoveisCards from "@/components/dashboard-cards/tiposimoveis-cards/TiposImoveisCards"
import { DashboardCharts } from "@/components/dashboards-charts/DashboardCharts"


export default function Dashboard() {
  return (
    <Layout>
      <div className="flex h-full w-full items-center flex-col p-4">
        <div className="w-4/5 gap-8 inline-flex">
          <BairrosCards />
          <ClientesCards />
          <ImoveisCards />
          <TiposImoveisCards />
        </div>
        <div className="mt-6 w-4/5">
          <DashboardCharts />
        </div>
      </div>
    </Layout>
  )
}