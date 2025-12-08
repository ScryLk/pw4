import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { ImagePlus, Trash2, Star, Upload, X } from "lucide-react"
import { FotosImoveisModel } from "@/types/FotosImoveis"

interface DialogFotosImovelProps {
  imovelId: number
  children: React.ReactNode
}

export default function DialogFotosImovel({ imovelId, children }: DialogFotosImovelProps) {
  const [open, setOpen] = useState(false)
  const [fotos, setFotos] = useState<FotosImoveisModel[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadingCapa, setUploadingCapa] = useState(false)
  const [uploadingOrdem, setUploadingOrdem] = useState(1)

  const fetchFotos = async () => {
    try {
      setLoading(true)
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")
      myHeaders.append("Accept", "application/json")

      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
      }

      const response = await fetch(
        `http://localhost:8080/imoveis/fotos/imovel/${imovelId}`,
        requestOptions
      )

      if (!response.ok) {
        throw new Error(`Erro ao buscar fotos: ${response.status}`)
      }

      const result: FotosImoveisModel[] = await response.json()
      setFotos(result.sort((a, b) => a.ordem - b.ordem))
    } catch (error) {
      console.error("Erro ao buscar fotos:", error)
      toast.error("Erro ao carregar fotos do imóvel")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      fetchFotos()
    }
  }, [open, imovelId])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Por favor, selecione apenas arquivos de imagem")
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("A imagem deve ter no máximo 5MB")
        return
      }
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Selecione uma imagem primeiro")
      return
    }

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("foto", selectedFile)
      formData.append("imovelId", imovelId.toString())
      formData.append("capa", uploadingCapa.toString())
      formData.append("ordem", uploadingOrdem.toString())

      const requestOptions: RequestInit = {
        method: "POST",
        body: formData,
        redirect: "follow",
        credentials: "include"
      }

      const response = await fetch(
        "http://localhost:8080/imoveis/fotos",
        requestOptions
      )

      if (!response.ok) {
        throw new Error(`Erro ao fazer upload: ${response.status}`)
      }

      toast.success("Foto enviada com sucesso!")
      setSelectedFile(null)
      setUploadingCapa(false)
      setUploadingOrdem(fotos.length + 1)
      await fetchFotos()
    } catch (error) {
      console.error("Erro ao fazer upload:", error)
      toast.error("Erro ao enviar foto")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (fotoId: number) => {
    try {
      setLoading(true)
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      const requestOptions: RequestInit = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include"
      }

      const response = await fetch(
        `http://localhost:8080/imoveis/fotos/${fotoId}`,
        requestOptions
      )

      if (!response.ok) {
        throw new Error(`Erro ao excluir foto: ${response.status}`)
      }

      toast.success("Foto excluída com sucesso!")
      await fetchFotos()
    } catch (error) {
      console.error("Erro ao excluir foto:", error)
      toast.error("Erro ao excluir foto")
    } finally {
      setLoading(false)
    }
  }

  const handleToggleCapa = async (fotoId: number, currentCapa: boolean) => {
    try {
      setLoading(true)
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      const foto = fotos.find(f => f.id === fotoId)
      if (!foto) return

      const raw = JSON.stringify({
        imovelId: foto.imovelId,
        capa: !currentCapa,
        ordem: foto.ordem
      })

      const requestOptions: RequestInit = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: "include"
      }

      const response = await fetch(
        `http://localhost:8080/imoveis/fotos/${fotoId}`,
        requestOptions
      )

      if (!response.ok) {
        throw new Error(`Erro ao atualizar foto: ${response.status}`)
      }

      toast.success(currentCapa ? "Foto removida da capa" : "Foto definida como capa!")
      await fetchFotos()
    } catch (error) {
      console.error("Erro ao atualizar foto:", error)
      toast.error("Erro ao atualizar foto")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gerenciar Fotos do Imóvel #{imovelId}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Section */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <ImagePlus size={20} />
              Adicionar Nova Foto
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Selecione a Imagem
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {selectedFile && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                    <span>{selectedFile.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={uploadingCapa}
                    onChange={(e) => setUploadingCapa(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">Definir como capa</span>
                </label>

                <div className="flex items-center gap-2">
                  <label className="text-sm">Ordem:</label>
                  <input
                    type="number"
                    min="1"
                    value={uploadingOrdem}
                    onChange={(e) => setUploadingOrdem(parseInt(e.target.value) || 1)}
                    className="w-20 px-2 py-1 border rounded text-sm"
                  />
                </div>
              </div>

              <Button
                onClick={handleUpload}
                disabled={!selectedFile || loading}
                className="w-full"
              >
                <Upload size={16} className="mr-2" />
                Enviar Foto
              </Button>
            </div>
          </div>

          {/* Photos Grid */}
          <div>
            <h3 className="font-semibold mb-4">Fotos do Imóvel ({fotos.length})</h3>

            {loading && fotos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Carregando fotos...
              </div>
            ) : fotos.length === 0 ? (
              <div className="text-center py-8 text-gray-500 border rounded-lg">
                Nenhuma foto adicionada ainda
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {fotos.map((foto) => (
                  <div
                    key={foto.id}
                    className="relative group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video bg-gray-100 relative">
                      <img
                        src={`http://localhost:8080${foto.caminhoArquivo}`}
                        alt={`Foto ${foto.ordem}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext fill='%23999' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EImagem%3C/text%3E%3C/svg%3E"
                        }}
                      />
                      {foto.capa && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                          <Star size={12} fill="white" />
                          Capa
                        </div>
                      )}
                    </div>

                    <div className="p-2 space-y-2">
                      <div className="text-xs text-gray-600">
                        Ordem: {foto.ordem}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleCapa(foto.id, foto.capa)}
                          disabled={loading}
                          className="flex-1 text-xs"
                        >
                          <Star size={14} className="mr-1" fill={foto.capa ? "currentColor" : "none"} />
                          {foto.capa ? "Remover" : "Capa"}
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(foto.id)}
                          disabled={loading}
                          className="text-xs"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
