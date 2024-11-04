import './PorqueAdotar.css'; 
import { FaPaw, FaHeart, FaHome, FaSmile } from 'react-icons/fa'; // Ícones da biblioteca react-icons

function PorqueAdotar() {
    return (
        <div className="porque-adotar-container">
            <h1 className="titulo-porque-adotar">Por que adotar?</h1>
            <div className="motivos-container">
                <div className="motivo">
                    <FaPaw className="motivo-icon" />
                    <h2>Salve uma vida</h2>
                    <p>Ao adotar, você dá uma nova chance a um animal que precisa de amor e cuidado.</p>
                </div>
                <div className="motivo">
                    <FaHeart className="motivo-icon" />
                    <h2>Amor incondicional</h2>
                    <p>Animais adotados oferecem amor e amizade que transformam sua vida.</p>
                </div>
                <div className="motivo">
                    <FaHome className="motivo-icon" />
                    <h2>Faça a diferença</h2>
                    <p>Adotar um animal ajuda a reduzir o número de animais em abrigos e faz a diferença na comunidade.</p>
                </div>
                <div className="motivo">
                    <FaSmile className="motivo-icon" />
                    <h2>Companhia e alegria</h2>
                    <p>Animais de estimação trazem alegria e felicidade para o seu lar.</p>
                </div>
            </div>
        </div>
    );
}

export default PorqueAdotar;
