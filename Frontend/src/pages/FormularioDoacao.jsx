import React, { useState } from 'react';
import '../styles/FormularioDoacao.css';

function FormularioDoacao() {
    const [animal, setAnimal] = useState({
        nome: '',
        tipo: '',
        idade: '',
        raca: '',
        statusAdocao: '',
        descricao: '',
        imagem: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnimal({ ...animal, [name]: value });
    };

    const handleFileChange = (e) => {
        setAnimal({ ...animal, imagem: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Primeiro, cria o animal (POST)
        const animalData = {
            nome: animal.nome,
            tipo: animal.tipo,
            idade: animal.idade,
            raca: animal.raca,
            statusAdocao: animal.statusAdocao,
            descricao: animal.descricao,
        };

        try {
            const response = await fetch('http://localhost:8080/api/animal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(animalData),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar animal');
            }

            const data = await response.json();
            console.log("ESSES SAO OS MEUS DADOS????"+ data);
            const animalId = data.id; // Supondo que o ID do animal é retornado após a criação

            // Agora, envia a imagem (POST para /upload)
            const formData = new FormData();
            formData.append('file', animal.imagem);

            const imageResponse = await fetch(`http://localhost:8080/api/animal/${animalId}/upload`, {
                method: 'POST',
                body: formData,
            });

            if (imageResponse.ok) {
                alert('Animal cadastrado e imagem enviada com sucesso!');
            } else {
                alert('Erro ao enviar imagem');
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            alert('Erro ao enviar dados');
        }
    };

    return (
        <div className="form-container">
            <h1>Cadastrar Animal para Doação</h1>
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
                    <input type="text" name="statusAdocao" value={animal.statusAdocao} onChange={handleChange} required />
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea name="descricao" value={animal.descricao} onChange={handleChange} required />
                </div>
                <div>
                    <label>Imagem:</label>
                    <input type="file" name="imagem" onChange={handleFileChange} required />
                </div>
                <button type="submit">Cadastrar Animal</button>
            </form>
        </div>
    );
}

export default FormularioDoacao;
