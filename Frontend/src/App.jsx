import { useState } from 'react'
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import Doacao from './components/Doacao/Doacao'
import Adocao from './components/Adocao/Adocao'
import PorqueAdotar from './components/PorqueAdotar/PorqueAdotar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
      <div>
        <PorqueAdotar/>
        <Adocao/>
        <Doacao/>
      </div>
      <Footer />
    </>
  )
}

export default App
