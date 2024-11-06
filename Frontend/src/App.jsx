import { useState } from 'react'
import Adocao from './components/Adocao/Adocao'
import Doacao from './components/Doacao/Doacao'
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import PorqueAdotar from './components/PorqueAdotar/PorqueAdotar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Header />
      <div>
        <PorqueAdotar/>
        <Adocao/>
        <Doacao/>
      </div>
      <Footer />
      </BrowserRouter>
  )
}

export default App
