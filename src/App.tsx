import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Login from './pages/auth/Login'
import Registro from './pages/auth/Registro'
import Dashboard from './pages/dashboard/Dashboard'
import Imoveis from './pages/imoveis/Imoveis'
import Clientes from './pages/clientes/Clientes'
import Bairros from './pages/bairros/Bairros'
import TiposImovel from './pages/tipos-imovel/TiposImovel'


function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        <Route path='/tipos-imovel' element={<TiposImovel />} />
        <Route path='/bairros' element={<Bairros />} />
        <Route path='/clientes' element={<Clientes />} />
        <Route path='/imoveis' element={<Imoveis />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
  