import React from 'react'
import './Home.css'
import Botao from '../../components/botao/Botao'
import  { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()

  function navegarGaleria() {
    navigate('/galeria')
  }

  return (
    <div className='tituloHome'>
        <div className='org_titulos'>
        <h2>Bem-vindo a</h2>
        <h1>Galeria Online</h1>
        <Botao nomeBotao="Entrar" funcBotao={navegarGaleria}/>
        </div>
    </div>
  )
}

export default Home