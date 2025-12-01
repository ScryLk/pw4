import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Users, ChevronUp, Home, ChartColumnIncreasing, Users2, Map, Tag } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCurrentRouteName } from "@/hooks/useCurrentRouteName"

export function AppSidebar() {
  const currentName = useCurrentRouteName()
  const navigate = useNavigate()
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-center p-4">
          <img src="/clear.png" alt="Logo" className="h-32 w-auto" />
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              className={`w-full justify-start gap-3 px-3 py-6 text-base cursor-pointer transition-colors
    ${currentName === "Dashboard" ? "bg-blue-50 text-blue-600" : "hover:bg-blue-50 hover:text-blue-600"}`}
              onClick={() => navigate('/dashboard')}
            >
              <ChartColumnIncreasing className={`h-5 w-5 ${currentName === "Dashboard" ? "text-blue-600" : "text-gray-600"}`} />
              <span className="font-medium">Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              className={`w-full justify-start gap-3 px-3 py-6 text-base cursor-pointer transition-colors
    ${currentName === "Imóveis" ? "bg-blue-50 text-blue-600" : "hover:bg-blue-50 hover:text-blue-600"}`}
              onClick={() => navigate('/imoveis')}
            >
              <Home className={`h-5 w-5 ${currentName === "Imóveis" ? "text-blue-600" : "text-gray-600"}`} />
              <span className="font-medium">Imóveis</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              className={`w-full justify-start gap-3 px-3 py-6 text-base cursor-pointer transition-colors
    ${currentName === "Clientes" ? "bg-blue-50 text-blue-600" : "hover:bg-blue-50 hover:text-blue-600"}`}
              onClick={() => navigate('/clientes')}
            >
              <Users className={`h-5 w-5 ${currentName === "Clientes" ? "text-blue-600" : "text-gray-600"}`} />
              <span className="font-medium">Clientes</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              className={`w-full justify-start gap-3 px-3 py-6 text-base cursor-pointer transition-colors
    ${currentName === "Bairros" ? "bg-blue-50 text-blue-600" : "hover:bg-blue-50 hover:text-blue-600"}`}
              onClick={() => navigate('/bairros')}
            >
              <Map className={`h-5 w-5 ${currentName === "Bairros" ? "text-blue-600" : "text-gray-600"}`} />
              <span className="font-medium">Bairros</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              className={`w-full justify-start gap-3 px-3 py-6 text-base cursor-pointer transition-colors
    ${currentName === "Tipos de Imóvel" ? "bg-blue-50 text-blue-600" : "hover:bg-blue-50 hover:text-blue-600"}`}
              onClick={() => navigate('/tipos-imovel')}
            >
              <Tag className={`h-5 w-5 ${currentName === "Tipos de Imóvel" ? "text-blue-600" : "text-gray-600"}`} />
              <span className="font-medium">Tipos de Imóvel</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="py-6">
                  <Users2 className="h-5 w-5" />
                  <span className="font-medium">Username</span>
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <div>
                  <button className="w-32 text-start" onClick={() => navigate('/login')}>Sair</button>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}