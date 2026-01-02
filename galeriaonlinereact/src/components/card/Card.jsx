import './Card.css'
import apagar from "../../assets/img/deletar.svg"
import editar from "../../assets/img/editar.svg"



export const Card = ({tituloCard, imgCard, funcEditar, funcExcluir}) => {
    return(
        <>
            <div className="cardImagem">
                <p>{tituloCard}</p>
                <img className="imgDoCard" src={imgCard} alt="Imagem relacionada ao card" />
                <div className="icons">
                    <img onClick={funcEditar} src={editar} alt="icone de caneta pra editar" />
                    <img onClick={funcExcluir} src={apagar} alt="icone de lixeira para realizar a exclusao" />
                </div>
            </div>
        </>
    )
}