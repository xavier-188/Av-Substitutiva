import { useEffect, useState } from "react";
import Imc from "../../../models/Imc";
import axios from "axios";
import { Link } from "react-router-dom";

function ListarImcs(){
   const [imcs, setImcs] = useState<Imc[]>([]);

   useEffect(() => {
    console.log("Componente Carregado!");
    buscarImcAPI();
   }, []);

async function buscarImcAPI() {
    try {
        const resposta = await axios.get("http://localhost:5225/api/imc/listar")
        setImcs(resposta.data);
        console.log(resposta.data);

    } catch (error) {
        console.log("Erro na requisição!" + error);
    }
    
}

return(
    <div>
        <h1>Lista de IMC</h1>
        <table>
             <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Altura</th>
            <th>Peso</th>
            <th>Valor IMC</th>
            <th>Classificação</th>
            <th>Criado Em</th>
            <th>Alterar</th>
            
          </tr>
        </thead>
        <tbody>
          {imcs.map((imc) => (
            <tr>
              <td>{imc.id}</td>
              <td>{imc.nome}</td>
              <td>{imc.altura}</td>
              <td>{imc.peso}</td>
              <td>{imc.valorImc}</td>
              <td>{imc.classificacao}</td>
              <td>{imc.criadoEm}</td>
              <td><Link to={`/imc/alterar/${imc.id}`}>Alterar</Link></td>
            
            </tr>
          ))}
        </tbody>
        </table>
    </div>
)

}
export default ListarImcs;