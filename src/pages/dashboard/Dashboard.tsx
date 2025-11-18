import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import Header from "@/components/header/header"


export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="w-20">
        <AppSidebar />
      </div>
      <main className="w-full justify-items-start">
        <Header name="Dashboard" />

      </main>
    </SidebarProvider>
  )
}