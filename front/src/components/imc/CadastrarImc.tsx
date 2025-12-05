import { useState } from "react";
import Imc from "../../../models/Imc";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CadastrarImc(){
    const[nome, setNome] = useState("");
    const[altura, setAltura] = useState(0);
    const[peso, setPeso] = useState(0);
    const navigate = useNavigate();
    

    function enviarImc(event:any){
        event.preventDefault();
        submeterImc();
        alert("IMC Cadastrado!");
        navigate("/");
    }

    async function submeterImc() {
        try {

            const imc: Imc = {
                nome: nome,
                altura: altura,
                peso: peso,
                valorImc: 0,
                classificacao: ""
            };
            const resposta = await axios.post("http://localhost:5225/api/imc/cadastrar", imc);
            console.log(await resposta.data);

        } catch (error:any) {
            if(error.status === 409){
                console.log("Esse IMC já foi cadastrado");
              }
        }
        
    }
    return (
        <div>
            <h1>Cadastrar IMC</h1>
            <form onSubmit={enviarImc}>
                <div>
                    <label>Nome:</label>
                    <input onChange={(e : any) => setNome(e.target.value)} type="text" />
                </div>
                <div>
                    <label>Altura:</label>
                    <input type="text" onChange={(e: any) => setAltura(e.target.value)} />
                </div>
                <div>
                    <label>Peso:</label>
                    <input type="text" onChange={(e: any) => setPeso(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );

}
export default CadastrarImc;