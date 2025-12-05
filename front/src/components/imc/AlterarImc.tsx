import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Imc from "../../../models/Imc";

function AlterarImc() {
    const { id } = useParams();

    const [nome, setNome] = useState("");
    const [altura, setAltura] = useState(0);
    const [peso, setPeso] = useState(0);
    const[classificacao, setClassificacao] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

    });

    async function buscarImcAPI() {
        try {
            const resposta = await axios.get(`http://localhost:5225/api/imc/alterar/${id}`);
            setAltura(resposta.data.altura);
            setPeso(resposta.data.peso);

        } catch (error) {
            console.log("Erro ao buscar IMC" + error);
        }
        
    }

    function enviarImc(event:any){
        event.preventDefault();
        submeterImc();
        navigate("/");
    }

    async function submeterImc() {
        try {

            const imc: Imc = {
                nome: nome,
                altura: altura,
                peso: peso,
                classificacao: "",
                valorImc: 0
            };
            const resposta = await axios.put(`http://localhost:5225/api/imc/alterar/${id}`, imc);
            console.log(await resposta.data);
            alert("IMC Recalculado");

        } catch (error:any) {
            if(error.status === 409){
                console.log("Esse IMC já foi cadastrado");
              }
        }
        
    }

    return (
        <div>
            <h1>Alterar IMC</h1>
            <form onSubmit={enviarImc}>
                <div>
                    <label>Nome:</label>
                    <input value={nome} onChange={(e: any) => setNome(e.target.value)} type="text" />
                </div>
                <div>
                    <label>Altura:</label>
                    <input type="number" value={altura} onChange={(e: any) => setAltura(e.target.value)} />
                </div>
                <div>
                    <label>Peso:</label>
                    <input type="number" value={peso} onChange={(e: any) => setPeso(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Alterar</button>
                </div>
            </form>
        </div>
    );


}
export default AlterarImc;
