import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import logo from "/clear.png"

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div className="space-y-4 w-96">
        <img src={logo} alt="" />
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
      </div>
    </div>
  )
}