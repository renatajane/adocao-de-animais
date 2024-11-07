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
    
        const formData = new FormData();
        formData.append('nome', animal.nome);
        formData.append('tipo', animal.tipo);
        formData.append('idade', animal.idade);
        formData.append('raca', animal.raca);
        formData.append('statusAdocao', animal.statusAdocao);
        formData.append('descricao', animal.descricao);
        formData.append('file', animal.imagem);  // Adiciona o arquivo da imagem
    
        try {
            const response = await fetch('http://localhost:8080/api/animal/createWithImage', {
                method: 'POST',
                body: formData, // Envia tudo no mesmo formData
            });
    
            if (!response.ok) {
                throw new Error('Erro ao cadastrar animal');
            }
    
            const data = await response.json();
            console.log("Dados recebidos: ", data);
            alert('Animal cadastrado com sucesso!');
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
                {/* <div>
                    <label>Status de Adoção:</label>
                    <select name="statusAdocao" value={animal.statusAdocao} onChange={handleChange} required>
                        <option value="">Selecione o status</option>
                        <option value="DISPONIVEL">Disponível</option>
                        <option value="EM_PROCESSO_ADOCAO">Em processo de adoção</option>
                        <option value="ADOTADO">Adotado</option>
                    </select>
                </div> */}
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
