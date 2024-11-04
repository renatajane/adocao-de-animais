import React from 'react';
import './Footer.css'; 

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} PetAdota. Todos os direitos reservados.</p>
                <nav className="footer-nav">
                    <ul>
                        <li><a href="/about">Sobre nós</a></li>
                        <li><a href="/contact">Contato</a></li>
                        <li><a href="/privacy">Política de Privacidade</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
