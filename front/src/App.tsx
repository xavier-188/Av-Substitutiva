import React from 'react';
import ListarImcs from './components/imc/ListarImcs';
import CadastrarImc from './components/imc/CadastrarImc';
import AlterarImc from './components/imc/AlterarImc';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div>
      <BrowserRouter>
      <nav>
        <ul>
          <li><Link to={"/"}>Lista de IMC</Link></li>
          <li><Link to={"/imc/cadastrar"}>Cadastrar IMC</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<ListarImcs/>}/>
        <Route path='/imc/cadastrar' element={<CadastrarImc/>}/>
        <Route path='imc/alterar/:id' element={<AlterarImc/>}/>
      </Routes>
      </BrowserRouter>
    </div>
   
  );
}

export default App;
