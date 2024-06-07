import { Button } from "../components/button"
import { Input } from "../components/input"
import { useState, useEffect } from "react"; 
import { useForm } from "react-hook-form"
import { ajax, apiResponse } from "../ajax/ajax.mts";
import { Acolhida } from "../components/acolhida";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
export interface benfeitor {
    nome: string;
}

export function Benfeitores() {
    const { register, handleSubmit } = useForm();
    const [filter, setFilter ] = useState<string>("");  
    const [isWaiting, setIsWaiting] = useState(false);
    const [benfeitores, setBenfeitores] = useState<benfeitor[]>([]);
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
        const benfeitores: apiResponse = await ajax("/benfeitores", "post", {acolhida: filter});
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
            <div className=" flex w-11/12 h-full bg-white mb-4" >
                {benfeitores.map((benfeitor: benfeitor) => {
                    return <Acolhida nome={benfeitor.nome} />
                })}
            </div>
        </div>
        </>
    )
}