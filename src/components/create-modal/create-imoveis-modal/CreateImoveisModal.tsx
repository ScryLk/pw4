import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import api from "@/lib/axios"
import { toast } from "sonner"

interface TipoImovel {
  id: number
  nome: string
}

interface Bairro {
  id: number
  nome: string
}

interface ImovelDTO {
  titulo: string
  descricao: string
  finalidade: string
  status: string
  tipoImovelId: number
  bairroId: number
  usuarioId?: number
  preco_venda?: number
  preco_aluguel?: number
  dormitorios?: number
  banheiros?: number
  garagem?: number
  area_total?: number
  area_construida?: number
  endereco?: string
  numero?: string
  complemento?: string
  cep?: string
  caracteristicas?: string
  destaque?: boolean
}

interface CreateImoveisModalProps {
  children: React.ReactNode
  onSubmit: (data: ImovelDTO) => void
}

export default function CreateImoveisModal({ children, onSubmit }: CreateImoveisModalProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [tiposImovel, setTiposImovel] = useState<TipoImovel[]>([])
  const [bairros, setBairros] = useState<Bairro[]>([])
  const [formData, setFormData] = useState<ImovelDTO>({
    titulo: "",
    descricao: "",
    finalidade: "VENDA",
    status: "DISPONIVEL",
    tipoImovelId: 0,
    bairroId: 0,
    endereco: "",
    numero: "",
    cep: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tiposResponse, bairrosResponse] = await Promise.all([
          api.get('/tipos-imoveis'),
          api.get('/bairros')
        ])
        setTiposImovel(tiposResponse.data)
        setBairros(bairrosResponse.data)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
        toast.error('Erro ao carregar tipos de imóveis e bairros')
      }
    }

    if (open) {
      fetchData()
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validação básica
    if (formData.tipoImovelId === 0 || formData.bairroId === 0) {
      toast.error('Por favor, selecione o Tipo de Imóvel e o Bairro')
      setIsLoading(false)
      return
    }

    // Preparar dados para envio - remover campos vazios e converter para null
    const userId = localStorage.getItem('userId')
    const dataToSend: any = {
      titulo: formData.titulo,
      descricao: formData.descricao,
      finalidade: formData.finalidade,
      status: formData.status,
      tipoImovelId: formData.tipoImovelId,
      bairroId: formData.bairroId,
      usuarioId: userId ? Number(userId) : undefined,
      endereco: formData.endereco || null,
      numero: formData.numero || null,
      cep: formData.cep || null,
    }

    console.log('Enviando dados:', dataToSend)

    try {
      const response = await api.post('/imoveis', dataToSend)
      console.log('Resposta:', response.data)
      onSubmit(formData)
      setOpen(false)
      setFormData({
        titulo: "",
        descricao: "",
        finalidade: "VENDA",
        status: "DISPONIVEL",
        tipoImovelId: 0,
        bairroId: 0,
        endereco: "",
        numero: "",
        cep: "",
      })
      toast.success('Imóvel criado com sucesso!')
    } catch (error: any) {
      console.error('Erro ao criar imóvel:', error)
      console.error('Detalhes do erro:', error.response?.data)
      console.error('Status:', error.response?.status)
      console.error('Headers:', error.response?.headers)

      if (error.response?.status === 403) {
        toast.error('Você não tem permissão para criar imóveis')
      } else if (error.response?.status === 401) {
        toast.error('Sessão expirada. Faça login novamente')
      } else if (error.response?.status === 500) {
        const errorMsg = error.response?.data?.message || error.response?.data?.error || 'Erro interno do servidor'

        // Verificar se é erro de usuário não encontrado
        if (errorMsg.includes('Usuário') && errorMsg.includes('não encontrado')) {
          toast.error('Sessão inválida. Por favor, faça login novamente.')
          setTimeout(() => {
            localStorage.clear()
            window.location.href = '/login'
          }, 2000)
        } else {
          toast.error(`Erro no servidor: ${errorMsg}`)
        }
        console.error('Erro 500 completo:', JSON.stringify(error.response?.data, null, 2))
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Erro ao criar imóvel. Verifique os dados e tente novamente')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="dark:text-white">Criar Imóvel</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium dark:text-white">Título *</label>
              <input
                type="text"
                placeholder="Digite o título"
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium dark:text-white">Descrição *</label>
              <textarea
                placeholder="Digite a descrição"
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium dark:text-white">Finalidade *</label>
                <select
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={formData.finalidade}
                  onChange={(e) => setFormData({ ...formData, finalidade: e.target.value })}
                  required
                >
                  <option value="VENDA">Venda</option>
                  <option value="ALUGUEL">Aluguel</option>
                  <option value="VENDA_E_ALUGUEL">Venda e Aluguel</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium dark:text-white">Status *</label>
                <select
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                >
                  <option value="DISPONIVEL">Disponível</option>
                  <option value="PENDENTE">Pendente</option>
                  <option value="VENDIDO">Vendido</option>
                  <option value="ALUGADO">Alugado</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium dark:text-white">Tipo de Imóvel *</label>
                <select
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={formData.tipoImovelId}
                  onChange={(e) => setFormData({ ...formData, tipoImovelId: Number(e.target.value) })}
                  required
                >
                  <option value={0}>Selecione um tipo</option>
                  {tiposImovel.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium dark:text-white">Bairro *</label>
                <select
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={formData.bairroId}
                  onChange={(e) => setFormData({ ...formData, bairroId: Number(e.target.value) })}
                  required
                >
                  <option value={0}>Selecione um bairro</option>
                  {bairros.map((bairro) => (
                    <option key={bairro.id} value={bairro.id}>
                      {bairro.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2 col-span-2">
                <label className="text-sm font-medium dark:text-white">Endereço *</label>
                <input
                  type="text"
                  placeholder="Digite o endereço"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium dark:text-white">Número *</label>
                <input
                  type="text"
                  placeholder="Nº"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  value={formData.numero}
                  onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium dark:text-white">CEP *</label>
              <input
                type="text"
                placeholder="00000-000"
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                value={formData.cep}
                onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-green-500 hover:bg-green-600">
              {isLoading ? 'Criando...' : 'Criar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}