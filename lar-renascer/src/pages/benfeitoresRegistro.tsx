import { useParams } from "react-router-dom"
import { Input } from "../components/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { ajax, apiResponse } from "../ajax/ajax.mts";
import toast, {Toaster} from 'react-hot-toast';
export function BenfeitoresRegister() {
    const [errors, setErrors] = useState<any>({});
    const { tipo } = useParams();
    const { register, handleSubmit } = useForm(); 
    const navigate = useNavigate();
    if (!tipo || (tipo !== "fisica" && tipo !== "juridica")) {
        return (
            <div className="customPink pageHeight w-screen flex justify-center items-center font-semibold text-3xl">
                Tipo de benfeitor não informado ou errado!
            </div>
        )
    }


    const onSubmit = async (data: any) => {
        if (tipo == "fisica") {
            const cpf = data.cpf;
            const trimmedCpf = cpf.replace(/\D/g, '');
            data.cpf = trimmedCpf;
        }
        if (tipo == "juridica") {
            const cnpj = data.cnpj;
            const trimmedCnpj = cnpj.replace(/\D/g, '');
            data.cnpj = trimmedCnpj;
        }    
    
        toast.dismiss();
        toast.loading("Cadastrando");
        if (tipo !== "fisica" && tipo !== "juridica") {
            toast.dismiss();
            return toast.error("Tipo de benfeitor inválido!");
        }
        const response:apiResponse = await ajax(`/benfeitores/register${tipo}`, "post", data);
        toast.dismiss();
        if (response.status == "error") {
            if (Array.isArray(response.message)) {
                const newErrors = { ...errors }; // Crie uma cópia do estado errors
                response.message.forEach((error: any) => {
                    newErrors[error.path] = error.msg;
                });
                setErrors(newErrors); // Defina o estado com o novo objeto
                console.log(newErrors);
                return;
            }
            if (typeof response.message == "string") {
                return toast.error(response.message);
            }
            return toast.error("Erro inesperado!");
            }
        if (response.status == "success") {
            toast.success("Cadastro Realizado!");
            setTimeout(() => {
                return navigate("/benfeitores/menu");    
            }, 2200);
            return;
        }

        toast.error("Erro inesperado!");
        return;
    }

    return (
        <>
        <Toaster/>
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
                <div className="mt-12 w-full flex items-center justify-between  " >
                    <div className="w-2/6" >
                        <Button name="cadastrar" title="Cadastrar" type="submit" /> 
                    </div>
                    <div className="w-2/6" >
                        <Button customCss="bg-red-500" name="cancelar" title="Cancelar" onClick={ () => navigate("/benfeitores/menu") }  />
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}