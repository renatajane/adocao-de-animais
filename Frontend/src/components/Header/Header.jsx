import React from 'react';
import './Header.css';
import logo from '../../assets/logo.png';

function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <img src={logo} alt="Logo PetAdota" className="logo" />
            </div>
            <nav className="header-nav">
                <ul>
                    <li><a href="/"><strong>Home</strong></a></li>
                    <li><a href="/sobre"><strong>Sobre a PetAdota</strong></a></li>
                    <li><a href="/formulario-cadastro"><strong>Cadastrar</strong></a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
