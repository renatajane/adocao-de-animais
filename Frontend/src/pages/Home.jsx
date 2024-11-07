import { FaPaw, FaHeart, FaHome, FaSmile } from 'react-icons/fa'; // Ícones da biblioteca react-icons
import React, { useEffect, useState } from 'react';
import gato from '../assets/gato.png';
import semFoto from '../assets/nao-tem-foto.png';
import adocao from '../assets/img-adocao.jpg';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    // Estado para armazenar a lista de animais e o tipo selecionado
    const [animais, setAnimais] = useState([]);
    const [erro, setErro] = useState(null);
    const [tipo, setTipo] = useState(''); // Estado para o tipo de animal
    const tiposAnimais = ['Cachorro', 'Gato', 'Pássaro']; // Tipos de animais

    // Função para buscar os animais do backend
    const fetchAnimais = async (tipo) => {
        let url = 'http://localhost:8080/api/animal/list';
        if (tipo) {
            url = `http://localhost:8080/api/animal/list-tipo?tipo=${tipo}`;
        }

        try {
            const response = await fetch(url);
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
        fetchAnimais(tipo);
    }, [tipo]); // Dependência no estado tipo

    const navigate = useNavigate();

    // Função para atualizar o status de adoção do animal para "ADOTADO"
    const handleAdotar = async (idAnimal) => {
        try {
            const response = await fetch(`http://localhost:8080/api/animal/${idAnimal}/status?status=ADOTADO`, {
                method: 'PATCH',
            });
            if (!response.ok) {
                throw new Error('Erro ao atualizar status');
            }
            fetchAnimais(tipo); // Atualiza a lista de animais após a alteração
            alert('Parabéns! Você adotou um animal!');
        } catch (error) {
            console.error('Erro ao adotar o animal:', error);
            alert('Erro ao adotar o animal.');
        }
    };

    // Função para deletar o animal
    const handleDeletar = async (idAnimal) => {
        const confirmDelete = window.confirm('Tem certeza que deseja excluir este animal?');
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8080/api/animal/${idAnimal}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Erro ao deletar animal');
                }
                fetchAnimais(tipo); // Atualiza a lista de animais após a exclusão
                alert('Animal deletado com sucesso!');
            } catch (error) {
                console.error('Erro ao deletar animal:', error);
                alert('Erro ao deletar animal.');
            }
        }
    };

    const handleClickDoacao = () => {
        navigate('/formulario-doacao');
    };

    return (
        <div>
            {/* Porque Adotar */}
            <div className="porque-adotar-container">
                <h1 className="titulo-porque-adotar">Por que adotar?</h1>
                <div className="motivos-container">
                    <div className="motivo">
                        <FaPaw className="motivo-icon" />
                        <h2>Salve uma vida</h2>
                        <p>Ao adotar, você dá uma nova chance a um animal que precisa de amor e cuidado.</p>
                    </div>
                    <div className="motivo">
                        <FaHeart className="motivo-icon" />
                        <h2>Amor incondicional</h2>
                        <p>Animais adotados oferecem amor e amizade que transformam sua vida.</p>
                    </div>
                    <div className="motivo">
                        <FaHome className="motivo-icon" />
                        <h2>Faça a diferença</h2>
                        <p>Adotar um animal ajuda a reduzir o número de animais em abrigos e faz a diferença na comunidade.</p>
                    </div>
                    <div className="motivo">
                        <FaSmile className="motivo-icon" />
                        <h2>Companhia e alegria</h2>
                        <p>Animais de estimação trazem alegria e felicidade para o seu lar.</p>
                    </div>
                </div>
            </div>

            {/* Adoção */}
            <div className="adocao-container">
                <img src={adocao} alt="Adocao" className="img-adocao" />
                <h1 className="titulo-adotar">Está pronto para adotar?</h1>
                <h2 className="subtitulo-adotar">
                    Estamos muito felizes com sua escolha!
                </h2>

                {/* Filtro de tipo */}
                <div className="filtro-tipo-container">
                    <select
                        className="filtro-tipo-select"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    >
                        <option value="">Todos</option>
                        {tiposAnimais.map((t, index) => (
                            <option key={index} value={t}>{t}</option>
                        ))}
                    </select>
                </div>

                <div className="animais-container">
                    {erro && <p className="erro">{erro}</p>}

                    {animais.length > 0 ? (
                        animais.map(animal => (
                            <div key={animal.idAnimal} className="animal-card">
                                <img
                                    src={animal.imagem ? `http://localhost:8080/api/animal/image/${animal.idAnimal}` : semFoto}
                                    alt={animal.nome}
                                    className="animal-imagem"
                                />
                                <h3 className="animal-nome">{animal.nome}</h3>
                                <p className="animal-tipo"><strong>Tipo:</strong> {animal.tipo}</p>
                                <p className="animal-idade"><strong>Idade:</strong> {animal.idade}</p>
                                <p className="animal-raca"><strong>Raça:</strong> {animal.raca}</p>
                                <p className="animal-status">
                                    <strong>Status de Adoção:</strong> {
                                        animal.statusAdocao === 'DISPONIVEL' ? 'Disponível para adoção' :
                                            animal.statusAdocao === 'EM_PROCESSO_ADOCAO' ? 'Em processo de adoção' :
                                                animal.statusAdocao === 'ADOTADO' ? 'Adotado' :
                                                    'Status desconhecido'
                                    }
                                </p>
                                <p className="animal-descricao"><strong>Descrição:</strong> {animal.descricao}</p>
                                <button onClick={() => handleAdotar(animal.idAnimal)} className="link-adotar">
                                    Adotar
                                </button>
                                <button onClick={() => handleDeletar(animal.idAnimal)} className="link-deletar">
                                    Deletar
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="mensagem-sem-animais">Infelizmente, não há animais disponíveis para adoção no momento.</p>
                    )}
                </div>
            </div>

            {/* Doação */}
            <div className="objetivo-container">
                <img src={gato} alt="Gato" className="gato" />
                <h1 className="titulo-doar">Deseja doar?</h1>
                <p className="descricao">
                    Doar um animal é um ato de amor e responsabilidade. Certifique-se de que está pronto para ajudar a
                    encontrar um novo lar para um amigo peludo. Lembre-se que cada animal merece atenção, carinho e um lar seguro.
                </p>
                <button onClick={handleClickDoacao} className="link-doacao">
                    clique aqui
                </button>
            </div>
        </div>
    );
}

export default Home;
