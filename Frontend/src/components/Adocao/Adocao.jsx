import React, { useEffect, useState } from 'react';
import gato from '../../assets/gato.png';
import semFoto from '../../assets/sem-foto.png';

import './Adocao.css';

function Adocao() {
    // Estado para armazenar a lista de animais
    const [animais, setAnimais] = useState([]);
    const [erro, setErro] = useState(null);

    // Função para buscar os animais do backend
    const fetchAnimais = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/animal/list');
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            const data = await response.json();
            setAnimais(data); // Atualiza o estado com os dados dos animais
        } catch (error) {
            setErro('Erro ao buscar dados: ' + error.message);
            console.error('Erro ao buscar dados:', error);
        }
    };

    // useEffect para chamar a função fetchAnimais quando o componente for montado
    useEffect(() => {
        fetchAnimais();
    }, []);

    return (
        <div className="adocao-container">
            <img src={gato} alt="Gato" className="gato" />
            <h1 className="titulo-adotar">Está pronto para adotar?</h1>
            <h2 className="subtitulo-adotar">Estamos muito felizes com sua escolha!</h2>

            <div className="animais-container">
                {erro && <p className="erro">{erro}</p>}

                {animais.length > 0 ? (
                    animais.map(animal => (
                        <div key={animal.idAnimal} className="animal-card">
                            {/* Verifica se a imagem está disponível; caso contrário, usa a URL da API ou imagem padrão */}
                            <img 
                                src={animal.imagem ? `http://localhost:8080/api/animal/image/${animal.idAnimal}` : semFoto} 
                                alt={animal.nome} 
                                className="animal-imagem" 
                            />
                            <h3 className="animal-nome">{animal.nome}</h3>
                            <p className="animal-tipo">Tipo: {animal.tipo}</p>
                            <p className="animal-idade">Idade: {animal.idade}</p>
                            <p className="animal-raca">Raça: {animal.raca}</p>
                            <p className="animal-status">Status de Adoção: {animal.status}</p>
                            <p className="animal-descricao">{animal.descricao}</p>
                            <a href={`/adocao/${animal.idAnimal}`} className="link-adotar">Adotar</a>
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
