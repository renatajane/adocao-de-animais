import React, { useEffect } from 'react';
import animais from '../assets/animais.png';
import '../styles/Informacoes.css';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

function Informacoes() {
    useEffect(() => {
        // Quando a página for carregada, rola até o topo
        window.scrollTo(0, 0);
    }, []);  // O array vazio garante que o efeito aconteça apenas na montagem do componente

    return (
        <div className="informacoes-container">
            {/* Seções de informações sobre adoção */}
            <div className="sobre-nos-container" id="sobre-nos">
                <h1 className="titulo-sobre-nos">Sobre Nós</h1>
                <p>
                    Somos uma organização dedicada a promover a adoção responsável de
                    animais. Nossa missão é dar uma segunda chance a animais em situação
                    de abandono e ajudar a encontrar um lar seguro e amoroso para eles.
                </p>
                <img src={animais} alt="Animais" className="img-animais" />
            </div>

            {/* Seção de Contato */}
            <div className="contato-container" id="contato">
                <h1 className="titulo-contato">Contato</h1>
                <p><FaPhone /> (61) 1234-5678</p>
                <p><FaEnvelope /> contato@adocao.com</p>
            </div>

            {/* Seção de Política de Privacidade */}
            <div className="politica-privacidade-container" id="politica-privacidade">
                <h1 className="titulo-politica">Política de Privacidade</h1>
                <p>
                    Não compartilhamos suas informações com terceiros, exceto quando necessário
                    para cumprir a legislação ou para fornecer serviços essenciais. Ao usar nosso
                    site, você concorda com nossa política de privacidade e autoriza a coleta
                    e o uso de seus dados conforme descrito.
                </p>
                <p>
                    Caso tenha dúvidas sobre nossa política de privacidade, entre em contato com
                    nossa equipe de suporte.
                </p>
            </div>
        </div>
    );
}

export default Informacoes;
