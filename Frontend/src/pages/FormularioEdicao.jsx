import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Formularios.css';

function FormularioEdicao() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); 
    
    const location = useLocation(); // Pega o estado da navegação
    const navigate = useNavigate();
    const [mensagem, setMensagem] = useState(null);
    const [animal, setAnimal] = useState({
        nome: '',
        tipo: '',
        idade: '',
        raca: '',
        statusAdocao: '',
        descricao: ''
    });

    // Preencher os dados do animal quando o componente for carregado
    useEffect(() => {
        if (location.state && location.state.animal) {
            setAnimal(location.state.animal);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnimal({ ...animal, [name]: value });
    };

    const handleVoltar = () => {
        navigate('/');  // Redireciona para a tela de home
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Criar o objeto com os dados para enviar como JSON
        const updatedAnimal = {
            nome: animal.nome,
            tipo: animal.tipo,
            idade: animal.idade,
            raca: animal.raca,
            statusAdocao: animal.statusAdocao,
            descricao: animal.descricao,
        };

        try {
            const response = await fetch(`http://localhost:8080/api/animal/${animal.idAnimal}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Cabeçalho para enviar JSON
                },
                body: JSON.stringify(updatedAnimal), // Enviar os dados no formato JSON
            });

            if (!response.ok) {
                throw new Error('Erro ao editar animal');
            }

            const data = await response.json();
            console.log("Dados recebidos: ", data);
            setMensagem({ tipo: 'success', texto: 'Animal editado com sucesso!' });

            // Limpar os campos após sucesso
            setAnimal({
                nome: '',
                tipo: '',
                idade: '',
                raca: '',
                statusAdocao: '',
                descricao: ''
            });

        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            alert('Erro ao editar animal');
        }
    };

    return (
        <div className="form-container">
            <h1>Editar Informações de Um Animal</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" name="nome"
                        pattern="^[A-Za-z\s]+$" minLength="2"
                        title="O nome deve conter apenas letras e no mínimo 2 caracteres."
                        value={animal.nome} onChange={handleChange} required />
                </div>
                <div>
                    <label>Tipo:</label>
                    <select name="tipo" value={animal.tipo} onChange={handleChange} required>
                        <option value="">Selecione um tipo</option>
                        <option value="CACHORRO">Cachorro</option>
                        <option value="GATO">Gato</option>
                        <option value="COELHO">Coelho</option>
                    </select>
                </div>
                <div>
                    <label>Idade:</label>
                    <input type="number" name="idade" value={animal.idade} onChange={handleChange} required />
                </div>
                <div>
                    <label>Raça:</label>
                    <input type="text" name="raca" value={animal.raca} onChange={handleChange} required />
                </div>
                <div>
                    <label>Status de Adoção:</label>
                    <select name="statusAdocao" value={animal.statusAdocao} onChange={handleChange} required>
                        <option value="">Selecione o status</option>
                        <option value="DISPONIVEL">Disponível</option>
                        <option value="EM_PROCESSO_ADOCAO">Em processo de adoção</option>
                        <option value="ADOTADO">Adotado</option>
                    </select>
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea name="descricao" value={animal.descricao} onChange={handleChange} required />
                </div>
                <button type="submit">Editar Animal</button>
            </form>

            {mensagem && (
                <div className={`mensagem ${mensagem.tipo === 'success' ? 'success' : 'error'}`}>
                    {mensagem.texto}
                </div>
            )}

            <button className="voltar-button" onClick={handleVoltar}>Voltar</button>
        </div>
    );
}

export default FormularioEdicao;
