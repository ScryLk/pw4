import { Moon, Sun } from "lucide-react"
import { Button } from "../ui/button"

interface HeaderProps {
  name: string
  onToggleDark: () => void
  dark: boolean
}

export default function Header({ name, onToggleDark, dark }: HeaderProps) {
  const verifyName : Record<string, string> = {
    Dashboard: 'Visão geral do sistema',
    Imóveis: 'Gerencie seus imóveis',
    Clientes: 'Gerencie seus clientes',
    'Tipos de Imóvel': 'Gerencie os tipos de imóveis',
    Bairros: 'Gerencie os bairros',
  } as const

  const descricao = verifyName[name] as string
  return (
    <div className="border-b w-full pl-35 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold">{name}</h1>
          {descricao && <p className="text-sm text-muted-foreground mt-1">{descricao}</p>}
        </div>
        <Button
          onClick={onToggleDark}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  )
}