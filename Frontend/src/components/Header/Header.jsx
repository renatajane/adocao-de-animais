import React from 'react';
import './Header.css'; 
import logo from '../../assets/logo.png';

function Header() {
    return (
        <header className="header">
            <div className="header-content">
            <img src={logo} alt="Logo PetAdota" className="logo" />
                {/* <h1>PetAdota</h1> */}
                <nav className="header-nav">
                    {/* <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">Sobre</a></li>
                        <li><a href="/pets">Pets para Adoção</a></li>
                        <li><a href="/contact">Contato</a></li>
                    </ul> */}
                </nav>
            </div>
        </header>
    );
}

export default Header;
