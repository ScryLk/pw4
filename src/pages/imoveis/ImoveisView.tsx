import ImoveisViewTable from "@/components/imoveis-table/ImoveisViewTable"
import logo from "/clear.png"

export default function ImoveisView() {
  return (
    <div className="flex h-screen w-full items-center flex-col justify-center p-4 bg-background">
      <div className="w-4/5 max-h-4xl">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo Lumina" className="w-24 h-24 mb-4" />
          <h1 className="text-2xl font-bold text-center">Visualização de Imóveis</h1>
        </div>
        <ImoveisViewTable />
      </div>
    </div>
  )
}
