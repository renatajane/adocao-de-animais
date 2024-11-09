import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import FormularioCadastro from './pages/FormularioCadastro';
import FormularioEdicao from './pages/FormularioEdicao';
import Home from './pages/Home';
import Sobre from './pages/Informacoes';

function App() {
  return (
    <BrowserRouter>
      {/* O Header aparece em todas as páginas */}
      <Header />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formulario-cadastro" element={<FormularioCadastro />} />
          <Route path="/formulario-edicao" element={<FormularioEdicao />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </div>

      {/* O Footer aparece em todas as páginas */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
