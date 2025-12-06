import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import logo from "/clear.png"
import { Moon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  senha: z.string()
})

type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {
  const navigate = useNavigate()
  const [dark, setDark] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  function nightMode() {
    setDark((prev) => !prev);
    dark ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
    console.log(dark)
  }

  async function onSubmit(data: LoginFormData) {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'  // Permite receber e enviar cookies de sessão
      })

      if (!response.ok) {
        throw new Error('Credenciais inválidas')
      }

      const result = await response.json()
      console.log('Resposta do servidor:', result)

      // Salvar dados do usuário autenticado
      localStorage.setItem('userId', result.id)
      localStorage.setItem('userName', result.nome)
      localStorage.setItem('userEmail', result.email)
      localStorage.setItem('userType', result.tipo)

      console.log('Usuário autenticado:', result.nome)

      navigate("/dashboard")
    } catch (error) {
      console.error('Erro no login:', error)
      alert('Erro ao fazer login. Verifique suas credenciais.')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <Card className="w-96 dark:bg-white-100 bg-slate-100">
        <CardHeader className="flex flex-col items-center text-start pb-4 space-y-2">
          <img src={logo} alt="Logo" className="h-24 w-24" />
          <div className="text-center w-screen">
            <h1 className="text-2xl font-semibold text-black">Login</h1>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-black">Email</Label> 
              <Input
                {...register("email")}
                placeholder="seu@email.com"
                className="placeholder:text-slate-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-black">Senha</Label>
              <Input
                {...register("senha")}
                type="password"
                placeholder="******"
                className="placeholder:text-slate-400"
              />
              {errors.senha && (
                <p className="text-red-500 text-sm">{errors.senha.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
            >
              Entrar
            </Button>
            <Button
              type="button"
              className="w-full bg-black text-white hover:bg-gray-800 cursor-pointer"
              onClick={() => navigate('/registro')}
            >
              Cadastrar
            </Button>
          </form>
        </CardContent>
      </Card>
      <div>
        <Button className="w-32 bg-black text-white cursor-pointer" onClick={() => nightMode()}>{dark && <Moon className="text-white" />}</Button>
      </div>
    </div>
  )
}
