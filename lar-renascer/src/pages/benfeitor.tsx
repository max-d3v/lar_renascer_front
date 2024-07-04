import { useEffect, useState } from "react";
import { Button } from "../components/button";
import { useParams } from "react-router-dom";
import { ajax } from "../ajax/ajax.mts";
import toast from "react-hot-toast";
interface benfeitor {
    nome: string;
}

export function Benfeitor() {
    const [benfeitor, setBenfeitor] = useState<any>({});
    const [transacoes, setTransacoes] = useState<any>([]); 
    const { id } = useParams<string>();

    
    const editaBenfeitor = () => {
        console.log("porno gay");
    }

    const carregaBenfeitor = async (id: string | undefined) => {
        const response = await ajax(`/benfeitor/${id}`, "get", null);
        if (response.status == "error") {
            toast.error("Erro ao carregar benfeitor")
            return;
        }

        setBenfeitor(response.benfeitor)
        setTransacoes(response.transacoes);
    }
    

    useEffect(() => {
        carregaBenfeitor(id);
    }, [])


    return (
        <div className="customPink px-6 flex items-center flex-col pageHeight" >
                <div className="w-3/12 self-end mt-4" >
                    <Button name="Editar" title="Editar" onClick={ () => editaBenfeitor() }  />
                </div>    
                <p className="m-0 mt-12 font-semibold text-3xl" >Benfeitor</p>
                <div className=" px-2 py-4 flex bg-white w-6/12 justify-between min-h-20 items-center font-semibold text-2xl ">
                    <div>
                        Nome: {benfeitor.tipo == "fisico" ? benfeitor.nome : benfeitor.razaoSocial}
                    </div>
                    <div>
                        {benfeitor.tipo == "fisico" ? "CPF: " : "CNPJ: " } { benfeitor.tipo == "fisico" ? benfeitor.cpf : benfeitor.cnpj } 
                    </div>
                    <div>
                        Telefone: {benfeitor.telefone}
                    </div>
                    
                </div>
                <p className="font-semibold text-3xl mt-16   mb-2 " >Transações</p>
                {transacoes.length == 0 ? <p className="text-3xl font-semibold mt-12" > Benfeitor não efetuou transações </p> : ""}  
                <div className="w-8/12 bg-white flex flex-col  " >
                    
                        
                    {transacoes.map((transacao: any, index: number) => { 
                            const dataObj = new Date(transacao.dataTransacao);
                            const dataFormat = dataObj.toLocaleDateString();
                        return (
                            <div className={`w-full p-2 flex justify-between ${index % 2 == 0 ? "bg-gray-200" : "bg-white"} items-center font-semibold text-2xl  min-h-20`} >
                                <div>
                                    Valor: R$ {transacao.valor}
                                </div>
                                <div>
                                    Tipo: {transacao.tipo}
                                </div>
                                <div>
                                    Data da Transação: {dataFormat  }
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
        </div>
    )
}