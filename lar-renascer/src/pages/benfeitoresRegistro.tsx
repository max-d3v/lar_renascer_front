import { useParams } from "react-router-dom"
import { Input } from "../components/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "../components/button";
export function BenfeitoresRegister() {
    const [errors, setErrors] = useState<any>({});
    const { tipo } = useParams();
    const { register, handleSubmit } = useForm(); 

    if (!tipo || (tipo !== "fisica" && tipo !== "juridica")) {
        return (
            <div className="customPink pageHeight w-screen flex justify-center items-center font-semibold text-3xl">
                Tipo de benfeitor não informado ou errado!
            </div>
        )
    }


    const onSubmit = async (data: any) => {
        console.log(data);
    }

    return (
        <div className="customPink pageHeight w-screen flex justify-center items-center font-semibold text-3xl">
            <form className="flex flex-col w-4/6 h-4/6" onSubmit={handleSubmit(onSubmit)} >
                <div className="self-start flex flex-col gap-12 " >
                    {
                        tipo == "fisica" ?
                        <>
                        <Input customCss="text-black" name="nome" register={register} placeholder="Nome" title="Nome do benfeitor" errors={errors.nome} />
                        <Input name="telefone" register={register} placeholder="Telefone" title="Telefone do benfeitor" errors={errors.telefone} />
                        <Input name="cpf" register={register} placeholder="CPF" title="CPF do benfeitor" errors={errors.cpf} />
                        </>
                        : tipo == "juridica" ?
                        <>
                        <Input name="razaoSocial" register={register} placeholder="Razão Social" title="Razão social do Benfeitor" errors={errors.razaoSocial} />
                        <Input name="telefone" register={register} placeholder="Telefone" title="Telefone do benfeitor" errors={errors.telefone} />
                        <Input name="cnpj" register={register} placeholder="CNPJ" title="CNPJ do benfeitor" errors={errors.cnpj} />
                        </>
                        :
                        null
                    }
                    
                </div>
                <div className="mt-12 w-1/6 " >
                    <Button name="cadastrar" title="Cadastrar" type="submit" /> 
                </div>
                <div>
                    <Button></Button>
                </div>
            </form>
        </div>
    )
}