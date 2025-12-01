import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import Header from "@/components/header/header"
import { useCurrentRouteName } from "@/hooks/useCurrentRouteName"

export default function Layout({ children }: { children: React.ReactNode }) {
  const currentName = useCurrentRouteName()

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <div className="pl-20">
          <Header name={currentName} />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}