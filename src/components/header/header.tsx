export default function Header({ name }: { name: string }) {
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
      <div className="flex flex-col items-start">
        <h1 className="text-2xl font-bold">{name}</h1>
        {descricao && <p className="text-sm text-muted-foreground mt-1">{descricao}</p>}
      </div>
    </div>
  )
}