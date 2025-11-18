export default function Header({ name }: { name: string }) {
  let descricao = '';

  if (name === 'Dashboard') {
    descricao = 'Visão geral do sistema';
  } else if (name === 'Imóveis') {
    descricao = 'Gerencie seus imóveis';
  } else if (name === 'Clientes') {
    descricao = 'Gerencie seus clientes';
  }

  return (
    <div className="border-b ml-15 w-screen px-6 py-4">
      <div className="flex flex-col items-start">
        <h1 className="text-2xl font-bold">{name}</h1>
        {descricao && <p className="text-sm text-muted-foreground mt-1">{descricao}</p>}
      </div>
    </div>
  )
}