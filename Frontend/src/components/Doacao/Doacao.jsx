import React from 'react';
import gato from '../../assets/gato.png';
import './Doacao.css'; 

function Doacao() {
    return (
        <div className="objetivo-container">
            <img src={gato} alt="Gato" className="gato" />
            <h1 className="titulo-doar">Deseja doar?</h1>
            <p className="descricao">
                Doar um animal é um ato de amor e responsabilidade. Certifique-se de que está pronto para ajudar a
                encontrar um novo lar para um amigo peludo. Lembre-se que cada animal merece atenção, carinho e um lar seguro.
            </p>
            {/* <h1 className="titulo-adotar">Deseja adotar?</h1>
            <p className="descricao">
                Se você está considerando a adoção, faça a diferença na vida de um animal que precisa de um lar.
            </p> */}
            <a href="/formulario-doacao" className="link-doacao">Clique aqui para preencher as informações do animal para doar.</a>
        </div>
    );
}

export default Doacao;
