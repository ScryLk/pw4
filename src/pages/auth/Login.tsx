import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import logo from "/clear.png"
import { useState } from "react"
import { z } from "zod"
import { toast } from "sonner"

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(1, "Senha obrigatória")
})

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
        credentials: 'include'
      })

      if (!response.ok) {
        toast.error("Email ou senha incorretos")
        return
      }

      const result = await response.json()

      localStorage.setItem('userId', result.id)
      localStorage.setItem('userName', result.nome)
      localStorage.setItem('userEmail', result.email)
      localStorage.setItem('userType', result.tipo)

      toast.success("Login realizado com sucesso!")
      navigate("/dashboard")
    } catch (error) {
      toast.error("Erro ao fazer login. Tente novamente.")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      <Card className="w-96">
        <CardHeader className="flex flex-col items-center space-y-2">
          <img src={logo} alt="Logo" className="h-24 w-24" />
          <h1 className="text-2xl font-semibold">Login</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Senha</Label>
              <Input
                type="password"
                placeholder="******"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>  
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
              Entrar
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate('/registro')}
            >
              Cadastrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
