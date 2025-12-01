import { useLocation } from "react-router-dom"

const routeToName: Record<string, string> = {
  '/': 'Dashboard',
  '/imoveis': 'Imóveis',
  '/clientes': 'Clientes',
  '/usuarios': 'Usuários',
  '/bairros': 'Bairros',
  '/tipos-imovel': 'Tipos de Imóvel',
}

export function useCurrentRouteName() {
  const location = useLocation()
  return routeToName[location.pathname]
}
