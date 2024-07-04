import { Button } from "../components/button"
import { Input } from "../components/input"
import { useState, useEffect } from "react"; 
import { useForm } from "react-hook-form"
import { ajax, apiResponse } from "../ajax/ajax.mts";
import { Benfeitor } from "../components/benfeitor";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export interface benfeitorInfo {
    id: number;
    nome: string;
    razaoSocial: string;
    cpf: string;
    cnpj: string;
    tipo: string;
    dataCadastro: string;
}

export function Benfeitores() {
    const { register, handleSubmit } = useForm();
    const [filter, setFilter ] = useState<string>("");  
    const [isWaiting, setIsWaiting] = useState(false);
    const [benfeitores, setBenfeitores] = useState<benfeitorInfo[]>([]);
    const [onlyOnFirstRender, setFirstRender] = useState(false);
    const navigate = useNavigate();

    const navigateBenfeitoresRegister = () => {
        navigate("/benfeitores/menu");
    }

    const handleDebouncedInput = () => {
        if (isWaiting) {
            return;
        }
        setIsWaiting(true);
        searchBenfeitores();
        setTimeout(() => {
            setIsWaiting(false);
        }, 500);

    }

    const searchBenfeitores = async () => {
        setBenfeitores([]);
        const benfeitores: apiResponse = await ajax("/benfeitores", "post", {benfeitor: filter});
        if (benfeitores.status == "error") {
            if (typeof benfeitores.message == "string") {
                toast.error(benfeitores.message);
            }
            if (Array.isArray(benfeitores.message)) {
                benfeitores.message.forEach((error: any) => {
                    toast.error(error.msg);
                });
                return;
            }
        }
        if (benfeitores.status == "success") {
            console.log(benfeitores);
            toast.success("Benfeitores carregados com sucesso!")
            setBenfeitores(benfeitores.data);
        }
    }


    useEffect(() => {
        console.log("executou com o first:" + onlyOnFirstRender);
        if (!onlyOnFirstRender) {
            setFirstRender(true);
            searchBenfeitores();
        }
    }, [])

    useEffect(() => {
        if (filter && filter.length >= 3) {
            handleDebouncedInput();
        }
    }, [filter])

    return (
        <>
        <Toaster/>
        <div className="pageHeight customPink px-6 flex flex-col items-center" >
            <div className="w-11/12 h-1/6 flex justify-between items-center " >
                <div className="w-2/6" >
                    <Input name="searchBenfeitores" placeholder="Pesquisar" title="Benfeitores" register={register} valueHandler={(e) => setFilter(e.target.value)} />
                </div>
                <div className="w-1/6" >
                    <Button name="benfeitoresSubmit" title="Cadastrar" onClick={navigateBenfeitoresRegister} />
                </div>
            </div>
            <div className="w-11/12 flex items-center justify-center mt-2 mb-1" >
                <div className="w-1/4 flex justify-center text-3xl font-semibold " >
                    Nome
                </div>
                <div className="w-1/4 flex justify-center text-3xl font-semibold" >
                    Identificador (CPF/CNPJ)
                </div>
                <div className="w-1/4 flex justify-center text-3xl font-semibold" >
                    Data de Cadastro
                </div>
                <div className="w-1/4 flex justify-center text-3xl font-semibold" >
                    Tipo
                </div>
            </div>
            <div className=" flex flex-col w-11/12 h-full bg-white mb-4" >
                {benfeitores.map((benfeitor: benfeitorInfo, index) => {
                    return <Benfeitor benfeitor={benfeitor} index={ index } />
                })}
            </div>
        </div>
        </>
    )
}