import React, { useState } from 'react';

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

        // FormData para enviar o arquivo de imagem
        const formData = new FormData();
        formData.append('file', animal.imagem);
        formData.append('animal', JSON.stringify({
            nome: animal.nome,
            tipo: animal.tipo,
            idade: animal.idade,
            raca: animal.raca,
            statusAdocao: animal.statusAdocao,
            descricao: animal.descricao,
        }));

        try {
            const response = await fetch('http://localhost:8080/api/animal', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Animal cadastrado com sucesso!');
            } else {
                alert('Erro ao cadastrar animal');
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
