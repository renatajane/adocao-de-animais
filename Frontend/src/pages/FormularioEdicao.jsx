import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/FormularioCadastro.css';

function FormularioEdicao() {
    const location = useLocation(); // Pega o estado da navegação
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
            alert('Animal editado com sucesso!');
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
                    <input type="text" name="nome" value={animal.nome} onChange={handleChange} required />
                </div>
                <div>
                    <label>Tipo:</label>
                    <input type="text" name="tipo" value={animal.tipo} onChange={handleChange} required />
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
        </div>
    );
}

export default FormularioEdicao;
