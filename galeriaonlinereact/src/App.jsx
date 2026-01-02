import './App.css'
import  Galeria  from './pages/galeria/Galeria'
import  Home   from './pages/home/Home'
import { Routes, Route } from 'react-router-dom'; // Importe os componentes de rota

function App() {

  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/galeria" element={<Galeria/>} />
      </Routes>
    </>
  )
}

export default App