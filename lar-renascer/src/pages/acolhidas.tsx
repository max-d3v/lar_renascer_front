import { Button } from "../components/button"
import { Input } from "../components/input"
import { useState, useEffect } from "react"; 
import { useForm } from "react-hook-form"
import { ajax, apiResponse } from "../ajax/ajax.mts";
import { Acolhida } from "../components/acolhida";
import toast, { Toaster } from 'react-hot-toast';
export interface acolhida {
    nome: string;
}

export function Acolhidas() {
    const { register, handleSubmit } = useForm();
    const [filter, setFilter ] = useState<string>("");  
    const [isWaiting, setIsWaiting] = useState(false);
    const [acolhidas, setAcolhidas] = useState<acolhida[]>([]);
    

    useEffect(() => {

        const handleDebouncedInput = () => {
            if (isWaiting) {
                return;
            }
            setIsWaiting(true);
            searchAcolhidas();
            setTimeout(() => {
                setIsWaiting(false);
            }, 500);
    
        }

        const searchAcolhidas = async () => {
            setAcolhidas([]);
            const acolhidas = await ajax("/acolhidas/todas", "post", {acolhida: filter});
            if (acolhidas.status == "error") {
                toast.error(acolhidas.message);
            }
            if (acolhidas.status == "success") {
                console.log(acolhidas);
                setAcolhidas(acolhidas.data);
            }
            
        }
        


        handleDebouncedInput();
    }, [filter])

    return (
        <>
        <Toaster/>
        <div className="pageHeight customPink px-6 flex flex-col items-center" >
            <div className="w-11/12 h-1/6 flex justify-between items-center " >
                <div className="w-2/6" >
                    <Input name="searchAcolhidas" placeholder="Pesquisar" title="Acolhidas" register={register} valueHandler={(e) => setFilter(e.target.value)} />
                </div>
                <div className="w-1/6" >
                    <Button name="acolhidasSubmit" title="Cadastrar" type="submit" />
                </div>
            </div>
            <div className=" flex w-11/12 h-full bg-white mb-4" >
                {acolhidas.map((acolhida: acolhida) => {
                    return <Acolhida nome={acolhida.nome} />
                })}
            </div>
        </div>
        </>
    )
}