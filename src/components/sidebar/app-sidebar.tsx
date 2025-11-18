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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Users, ChevronUp, Home, ChartColumnIncreasing, Users2, Map, Tag} from "lucide-react"



export function AppSidebar() {
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
              <SidebarMenuButton className="w-full justify-start gap-3 px-3 py-6 text-base cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <ChartColumnIncreasing className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-start gap-3 px-3 py-6 text-base cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Home className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Imóveis</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-start gap-3 px-3 py-6 text-base cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Users className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Usuários</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-start gap-3 px-3 py-6 text-base cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Map className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Bairros</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-start gap-3 px-3 py-6 text-base cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Tag className="h-5 w-5 text-gray-600" />
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
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
  )
}