import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from './pages/Home'
import FormularioDoacao from './pages/FormularioDoacao';
import FormularioEdicao from './pages/FormularioEdicao'

function App() {
  return (
    <BrowserRouter>
      {/* O Header aparece em todas as páginas */}
      <Header />
      
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/formulario-doacao" element={<FormularioDoacao />} />
          <Route path="/formulario-edicao" element={<FormularioEdicao />} />
        </Routes>
      </div>
      
      {/* O Footer aparece em todas as páginas */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
