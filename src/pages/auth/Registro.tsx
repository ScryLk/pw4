import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import logo from "/clear.png"

export default function Registro() {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <Card className="w-96 bg-slate-100">
        <CardHeader className="flex flex-col items-center text-start pb-4 space-y-2">
          <img src={logo} alt="Logo" className="h-24 w-24" />
          <div className="text-center w-screen">
            <h1 className="text-2xl font-semibold">Registrar</h1>

          </div>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
            <Label>Nome</Label>
            <Input type="password" placeholder="******" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input placeholder="seu@email.com" />
          </div>
          <div className="space-y-2">
            <Label>Senha</Label>
            <Input type="password" placeholder="******" />
          </div>
          <div className="space-y-2">
            <Label>Confirme sua senha</Label>
            <Input type="password" placeholder="******" />
          </div>
          <Button
            className="w-full bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
            onClick={() => {
              navigate('/login')
            }}
          >
            Entrar
          </Button>
          <Button
            className="w-full bg-white text-black hover:bg-amber-100 cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Retornar para o Login
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}