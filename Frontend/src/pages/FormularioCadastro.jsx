import React, { useState, useRef, useEffect } from 'react';
import '../styles/Formularios.css';
import { useNavigate } from 'react-router-dom';

function FormularioCadastro() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [animal, setAnimal] = useState({
        nome: '',
        tipo: '',
        idade: '',
        raca: '',
        statusAdocao: '',
        descricao: '',
        imagem: null
    });
    const [mensagem, setMensagem] = useState(null);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

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
        formData.append('file', animal.imagem);

        const response = await fetch('http://localhost:8080/api/animal/create', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            setMensagem({ tipo: 'error', texto: data.erro });
            return;
        }

        setMensagem({ tipo: 'success', texto: 'Animal cadastrado com sucesso!' });

        // Limpar campos após submeter os dados
        setAnimal({
            nome: '',
            tipo: '',
            idade: '',
            raca: '',
            statusAdocao: '',
            descricao: '',
            imagem: null
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Limpa o campo de imagem
        }
    };

    const handleVoltar = () => {
        navigate('/');  // Redireciona para a tela de home
    };

    return (
        <div className="form-container">
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" name="nome"
                        pattern="^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$" minLength="2"
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
                    <label>Descrição:</label>
                    <textarea name="descricao" value={animal.descricao} onChange={handleChange} required />
                </div>
                <div>
                    <label>Imagem:</label>
                    <input type="file" name="imagem" onChange={handleFileChange} ref={fileInputRef} required />
                </div>
                <button type="submit">Salvar</button>
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

export default FormularioCadastro;
