import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} PetAdota. Todos os direitos reservados.</p>
                <nav className="footer-nav">
                    <ul>
                        <li><Link to="/sobre">Mais informações sobre a PetAdota</Link></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
