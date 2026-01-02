import React from 'react'
import './Galeria.css'
import icon from "../../assets/img/enviar.svg"
import Botao from '../../components/botao/Botao'
import { Card } from '../../components/card/Card'
import { useEffect, useState } from "react";
import api from '../../Services/services'

const Galeria = () => {

    const[cards, setCards] = useState([]);
    const[imagem, setImagem] = useState([null]);
    const[nomeImagem, setNomeImagem] = useState("");

   async function listarCards() {
        try {
            const resposta = await api.get("Imagem")
            setCards(resposta.data)
        } catch (error) {
            console.log("Erro ao listar", error);
            
        }
    }

    async function cadastrarCard(e) {
        e.preventDefault();
        if (imagem && nomeImagem) {
            try {
                //FormData e uma interface que permite acrescentar dados no formulario
                const formData = new FormData();
                //append: anexar/acrescentar/adicionar
                formData.append("Nome", nomeImagem)
                formData.append("Arquivo", imagem)

                await api.post("Imagem/upload", formData,{
                    headers:{
                        "Content-Type" : "multpart/form-data"
                    }
                });
                
                

            } catch (error) {
                alert("Nao foi possivel realizar o cadastro !")
            }
        } else{
            alert("Preencha os campos de Nome e Imagem !")
        }
    
    }

    function editarCard(id, nomeAntigo) {
            
        const novoNome = prompt("Qual o nome da imagem ?", nomeAntigo)

        const inputArquivo = document.createElement("input");

        inputArquivo.type = "file";
        //Aceita qualquer imagem independente da extensao
        inputArquivo.accept = "image/*"
        inputArquivo.style = "display: none"

        //define oque acontece quando um usuario selecionar um arquivo 
        inputArquivo.onchange = async (e) => {
            
            const novoArquivo = e.target.files[0];

            const formData = new FormData();

            //Adicionar o novo nome no FormData
            formData.append("Nome", novoNome);
            formData.append("Arquivo", novoArquivo)

            if (formData) {
                try {
                    await api.put(`Imagem/${id}`, formData,{
                        headers:{
                        "Content-Type" : "multipart/form-data" 
                    }
                    })
                    alert("Deu crto ;)")
                    listarCards();  
                } catch (error) {
                    alert("Nao foi possivel alterar o card! ");
                    console.log(error);
                    
                }
            }

        };

        inputArquivo.click()
        
    }

    async function excluirCard(id) {
        try {
          await api.delete(`Imagem/${id}`)  
          alert("Isolado")
        } catch (error) {
            alert("Nao foi possivel excluir card")
            console.log(error);
            
        }
    }

    useEffect(() => {
        listarCards()
    })



    return (
        <>
            <h1 className='tituloGaleria'>Galeria Online</h1>

            <form className="formulario" onSubmit={cadastrarCard}>

                <div className="campoNome">
                    <label>Nome</label>
                    <input type="text" className="inputNome" onChange={(e) => setNomeImagem(e.target.value)} value={nomeImagem}/>
                </div>

                <div className="campoImagem">
                    <label className="arquivoLabel">
                        <i><img src={icon} alt="icone de upload de imagem" /></i>
                        <input type="file" className="arquivoInput" onChange={(e) => setImagem(e.target.files[0])}/>

                    </label>
                </div>
                
                <Botao nomeBotao="Cadastrar" />
            </form>

            <div className="campoCards">
                {cards.length > 0 ?(
                    cards.map((e) => (
                        <Card
                        key={e.id}
                        tituloCard={e.nome}
                        imgCard={`https://localhost:7229/${e.caminho.replace("wwwroot/", "")}`}
                        funcEditar={() => editarCard(e.id, e.nome)}
                        funcExcluir={() => excluirCard(e.id)}
                        />
                        
                    ))
                ) : <p>Nenhum card encontrado</p>
                }
        
                
            </div>

        </>
    )
}

export default Galeria;