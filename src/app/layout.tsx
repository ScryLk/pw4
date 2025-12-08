import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import Header from "@/components/header/header"
import { useCurrentRouteName } from "@/hooks/useCurrentRouteName"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Layout({ children }: { children: React.ReactNode }) {
  const currentName = useCurrentRouteName()
  const navigate = useNavigate()
  const [username, setUserName] = useState<string | null>(null)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const name = localStorage.getItem('userName')
    if (name) {
      setUserName(name)
    } else {
      navigate('/login')
    }
  }, [navigate])

  const toggleDarkMode = () => {
    setDark(!dark)
    if (!dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <div className="pl-20">
          <Header name={currentName} onToggleDark={toggleDarkMode} dark={dark} />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}