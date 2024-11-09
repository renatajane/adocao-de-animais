import { FaPaw, FaHeart, FaHome, FaSmile } from 'react-icons/fa'; // Ícones da biblioteca react-icons
import React, { useEffect, useState } from 'react';
import gato from '../assets/gato.png';
import semFoto from '../assets/nao-tem-foto.png';
import adocao from '../assets/img-adocao.jpg';
import gatoCachorro from '../assets/animais-sem-fundo.png'
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    // Estado para armazenar a lista de animais e o tipo selecionado
    const [animais, setAnimais] = useState([]);
    const [erro, setErro] = useState(null);
    const [tipo, setTipo] = useState(''); // Estado para o tipo de animal
    const [showConfirmDelete, setShowConfirmDelete] = useState(false); // Estado para controlar a confirmação de exclusão
    const [animalToDelete, setAnimalToDelete] = useState(null); // Animal selecionado para exclusão
    const [successMessage, setSuccessMessage] = useState(''); // Mensagem de sucesso
    const tiposAnimais = ['Cachorro', 'Coelho', 'Gato']; // Tipos de animais

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
    }, [tipo]);

    const navigate = useNavigate();

    // Função para deletar o animal
    const handleDeletar = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/animal/${animalToDelete.idAnimal}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Erro ao deletar animal');
            }
            setSuccessMessage('Animal deletado com sucesso!');
            fetchAnimais(tipo); // Atualiza a lista de animais após a exclusão
            setShowConfirmDelete(false);
            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);

        } catch (error) {
            console.error('Erro ao deletar animal:', error);
            setSuccessMessage('Erro ao deletar animal.');
        }
    };

    const handleClickDoacao = () => {
        navigate('/formulario-cadastro');
    };

    // Função para navegar até a página de edição do animal
    const handleEditar = (animal) => {
        navigate('/formulario-edicao', { state: { animal } });
    };

    const handleConfirmDelete = (animal) => {
        setAnimalToDelete(animal);
        setShowConfirmDelete(true);
    };

    return (
        <div>
            {/* Porque Adotar */}
            <div>
                {/* Importância da Adoção */}
                <div className="porque-adotar-container">
                    <h1 className="titulo-porque-adotar">Importância da Adoção</h1>
                    <div className="motivos-container">
                        <div className="motivo">
                            <FaPaw className="motivo-icon" />
                            <h2>Ato que salva vidas</h2>
                            <p>Adotar um animal é um gesto de amor que salva uma vida e dá a ele uma nova chance de ser feliz.</p>
                        </div>
                        <div className="motivo">
                            <FaHome className="motivo-icon" />
                            <h2>Faz a diferença</h2>
                            <p>Ao adotar, você contribui para reduzir o número de animais em abrigos e ajuda a criar uma sociedade mais solidária.</p>
                        </div>
                        <div className="motivo">
                            <FaHeart className="motivo-icon" />
                            <h2>Amor incondicional</h2>
                            <p>Animais adotados oferecem amor, lealdade e uma amizade sincera, transformando a vida de seus donos.</p>
                        </div>
                        <div className="motivo">
                            <FaSmile className="motivo-icon" />
                            <h2>Companhia e alegria</h2>
                            <p>Animais de estimação trazem muita felicidade e uma companhia fiel para todos os momentos da sua vida.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nossos Animais */}
            <div className="header-nossos-animais">
                <img src={adocao} alt="Adocao" className="img-adocao" />
                <h1 className="titulo-adotar">Conheça nossos animais</h1>
                <div className="filtro-tipo-container">
                    <p>Filtrar animal por tipo:</p>
                    <select
                        className="filtro-tipo-select"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    >
                        <option value="">Todos os tipos</option>
                        {tiposAnimais.map((t, index) => (
                            <option key={index} value={t}>{t}</option>
                        ))}
                    </select>
                </div>

                <div className="container">
                    {animais.length > 0 ? (
                        animais.map((animal) => (
                            <div key={animal.idAnimal} className="card">
                                <img
                                    src={`http://localhost:8080/api/animal/image/${animal.idAnimal}` || semFoto}
                                    alt={`Imagem do animal ${animal.idAnimal}`}
                                    className="image"
                                />
                                <div className="cardContent">
                                    <h3 className="animal-nome">{animal.nome}</h3>
                                    <p className="animal-tipo"><strong>Tipo:</strong> {animal.tipo === 'CACHORRO' ? 'Cachorro' :
                                        animal.tipo === 'GATO' ? 'Gato' :
                                            animal.tipo === 'COELHO' ? 'Coelho' :
                                                'Tipo desconhecido'
                                    }
                                    </p>
                                    <p className="animal-idade"><strong>Idade:</strong> {animal.idade}</p>
                                    <p className="animal-raca"><strong>Raça:</strong> {animal.raca}</p>
                                    <p className="animal-descricao"><strong>Descrição:</strong> {animal.descricao}</p>
                                    <p className="animal-status">
                                        <strong>Status de Adoção:</strong> {
                                            animal.statusAdocao === 'DISPONIVEL' ? 'Disponível para adoção' :
                                                animal.statusAdocao === 'EM_PROCESSO_ADOCAO' ? 'Em processo de adoção' :
                                                    animal.statusAdocao === 'ADOTADO' ? 'Adotado' :
                                                        'Status desconhecido'
                                        }
                                    </p>
                                </div>
                                <button onClick={() => handleEditar(animal)} className="link-editar">Editar</button>
                                <button onClick={() => handleConfirmDelete(animal)} className="link-deletar">Remover</button>
                            </div>
                        ))
                    ) : (
                        <p className="mensagem-sem-animais">Infelizmente, não há animais disponíveis para adoção no momento.</p>
                    )}
                </div>
            </div>

            {/* Confirmação de Remoção */}
            {showConfirmDelete && (
                <div className="confirm-delete-overlay">
                    <div className="confirm-delete-box">
                        <h2>Tem certeza que deseja excluir este animal?</h2>
                        <button onClick={handleDeletar} className="link-editar">Sim, excluir</button>
                        <button onClick={() => setShowConfirmDelete(false)} className="link-deletar">Cancelar</button>
                    </div>
                </div>
            )}

            {/* Mensagem de Sucesso */}
            {successMessage && (
                <div className="success-message">
                    <p>{successMessage}</p>
                </div>
            )}

            {/* Doação */}
            <div className="objetivo-container">
                <img src={gatoCachorro} alt="GatoCachorro" className="gatoCachorro" />
                <h1 className="titulo-doar">Cadastrar Animais para Adoção</h1>
                <p className="descricao">
                    A PetAdota realiza o cadastro dos animais para adoção, garantindo que cada um receba a atenção e cuidado que merece. Adoção é um ato de amor e responsabilidade, oferecendo a esses animais uma nova chance de um lar seguro e carinhoso.
                </p>

                <button onClick={handleClickDoacao} className="link-doacao">
                    Cadastre aqui
                </button>
            </div>
        </div>
    );
}

export default Home;
