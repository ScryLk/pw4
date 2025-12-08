import Layout from "@/app/layout"
import ClienteTable from "@/components/clientes-table/ClienteTable"
import CreateClientesModal from "@/components/create-modal/create-clientes-modal/CreateClientesModal"
import { Button } from "@/components/ui/button"
import { Plus, ShieldAlert } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Clientes() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const userType = localStorage.getItem('userType')

    if (!userType) {
      navigate('/login')
      return
    }

    if (userType !== 'ADMIN') {
      setIsAdmin(false)
      setIsLoading(false)
      return
    }

    setIsAdmin(true)
    setIsLoading(false)
  }, [navigate])

  const handleClienteCreated = () => {
    setRefreshKey(prev => prev + 1)
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-gray-500">Carregando...</p>
        </div>
      </Layout>
    )
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="flex h-full w-full items-center justify-center p-4">
          <div className="flex flex-col items-center gap-4 max-w-md text-center">
            <ShieldAlert className="h-16 w-16 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-800">Acesso Negado</h2>
            <p className="text-gray-600">
              Você não tem permissão para acessar esta página.
              Apenas administradores podem gerenciar clientes.
            </p>
            <Button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-500 hover:bg-blue-600 mt-4"
            >
              Voltar ao Dashboard
            </Button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex h-full w-full items-center flex-col text-sidebar-foreground justify-center p-4">
        <div className="w-4/5 max-h-4xl">
          <div className="flex justify-end mb-4">
            <CreateClientesModal onSuccess={handleClienteCreated}>
              <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Novo Cliente
              </Button>
            </CreateClientesModal>
          </div>
          <ClienteTable key={refreshKey} />
        </div>
      </div>
    </Layout>
  )
}
