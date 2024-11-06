import React, { useState } from 'react';
// import React from 'react';
import gato from '../../assets/gato.png';
import './Doacao.css';
import { useNavigate } from 'react-router-dom';

function Doacao() {

    const navigate = useNavigate();

    const handleClick = () => {
        console.log('Botão clicado!');
        navigate('/formulario-doacao');
    };

    return (
        <div className="objetivo-container">
            <img src={gato} alt="Gato" className="gato" />
            <h1 className="titulo-doar">Deseja doar?</h1>
            <p className="descricao">
                Doar um animal é um ato de amor e responsabilidade. Certifique-se de que está pronto para ajudar a
                encontrar um novo lar para um amigo peludo. Lembre-se que cada animal merece atenção, carinho e um lar seguro.
            </p>
            <button onClick={handleClick} className="link-doacao">
                Clique aqui para preencher as informações do animal para doar.
            </button>
        </div>
    );
}

export default Doacao;
