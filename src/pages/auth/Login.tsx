import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import logo from "/clear.png"

export default function Login() {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <Card className="w-96 bg-slate-100">
        <CardHeader className="flex flex-col items-center text-start pb-4 space-y-2">
          <img src={logo} alt="Logo" className="h-24 w-24" />
          <div className="text-center w-screen">
            <h1 className="text-2xl font-semibold">Login</h1>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input placeholder="seu@email.com" />
          </div>
          <div className="space-y-2">
            <Label>Senha</Label>
            <Input type="password" placeholder="******" />
          </div>
          <Button className="w-full bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">
            Entrar
          </Button>
          <Button className="w-full bg-black text-white hover:bg-gray-800 cursor-pointer" onClick={() => navigate('/registro')} >
            Cadastrar
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}