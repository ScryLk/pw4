import { useEffect, useState } from "react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { fetchBairrosCount, fetchClientesCount, fetchImoveisCount, fetchTiposImoveisCount } from "@/services/dashboardService"

export function DashboardCharts() {
    const [chartData, setChartData] = useState([
        { name: "Bairros", qtd: 0 },
        { name: "Clientes", qtd: 0 },
        { name: "Imóveis", qtd: 0 },
        { name: "Tipos", qtd: 0 }
    ])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        Promise.all([
            fetchBairrosCount(),
            fetchClientesCount(),
            fetchImoveisCount(),
            fetchTiposImoveisCount()
        ])
            .then(([bairros, clientes, imoveis, tipos]) => {
                console.log("Dados do gráfico:", { bairros, clientes, imoveis, tipos })
                setChartData([
                    { name: "Bairros", qtd: bairros },
                    { name: "Clientes", qtd: clientes },
                    { name: "Imóveis", qtd: imoveis },
                    { name: "Tipos", qtd: tipos }
                ])
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[300px] dark:text-white">
                <p>Carregando gráfico...</p>
            </div>
        )
    }

    return (
        <ChartContainer config={{}} className="h-[300px] text-blue-500 w-full dark:bg-gray-800 rounded-lg p-4">
            <BarChart className="" data={chartData}>
                <XAxis dataKey="name" stroke="currentColor" className="dark:text-white" />
                <YAxis stroke="currentColor" className="dark:text-white" />
                <Bar dataKey="qtd" fill="#0080E7" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}
