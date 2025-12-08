export interface FotosImoveisModel {
  id: number
  imovelId: number
  caminhoArquivo: string
  capa: boolean
  ordem: number
  createdAt?: string
  updatedAt?: string
}

export interface FotosImoveisDTO {
  imovelId: number
  capa: boolean
  ordem: number
}

export interface PageFotos {
  content: FotosImoveisModel[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}
