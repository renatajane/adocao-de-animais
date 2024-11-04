import React from 'react';
import gato from '../../assets/gato.png';
import './Adocao.css'; 

// Simulação de uma lista de animais disponíveis
const animaisDisponiveis = [
    {
        id: 1,
        nome: "Rex",
        tipo: "Cão",
        idade: "2 anos",
        raca: "Labrador",
        status: "Disponível",
        descricao: "Rex é um labrador amigável e brincalhão, perfeito para famílias.",
        imagem: gato // Você pode mudar para a imagem específica do animal
    },
    {
        id: 2,
        nome: "Miau",
        tipo: "Gato",
        idade: "1 ano",
        raca: "Siamês",
        status: "Em processo de adoção",
        descricao: "Miau adora ser acariciado e é muito carinhoso.",
        imagem: gato
    },
    {
        id: 3,
        nome: "Bunny",
        tipo: "Coelho",
        idade: "6 meses",
        raca: "Mini Coelho",
        status: "Adotado",
        descricao: "Bunny é um coelhinho muito doce e adora pular.",
        imagem: gato
    },
    // Adicione mais animais conforme necessário
];

function Adocao() {
    return (
        <div className="adocao-container">
            <img src={gato} alt="Gato" className="gato" />
            <h1 className="titulo-adotar">Está pronto para adotar?</h1>
            <h2 className="subtitulo-adotar">Estamos muito felizes com sua escolha!</h2>

            <div className="animais-container">
                {animaisDisponiveis.length > 0 ? (
                    animaisDisponiveis.map(animal => (
                        <div key={animal.id} className="animal-card">
                            <img src={animal.imagem} alt={animal.nome} className="animal-imagem" />
                            <h3 className="animal-nome">{animal.nome}</h3>
                            <p className="animal-tipo">Tipo: {animal.tipo}</p>
                            <p className="animal-idade">Idade: {animal.idade}</p>
                            <p className="animal-raca">Raça: {animal.raca}</p>
                            <p className="animal-status">Status de Adoção: {animal.status}</p>
                            <p className="animal-descricao">{animal.descricao}</p>
                            <a href={`/adocao/${animal.id}`} className="link-adotar">Adotar</a>
                        </div>
                    ))
                ) : (
                    <p className="mensagem-sem-animais">Infelizmente, não há animais disponíveis para adoção no momento.</p>
                )}
            </div>
        </div>
    );
}

export default Adocao;
