import { Input } from "../components/input"
import { Button } from "../components/button"
import { useForm } from "react-hook-form"
import { useState } from "react";
import { ajax, apiResponse } from "../ajax/ajax.mts";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const { register, handleSubmit } = useForm();
    const [errors, setErrors] = useState<any>({});

    const navigate = useNavigate();


    const onSubmit = async (data: any) => {
        setErrors({});
        toast.dismiss();
        toast.loading("Entrando");
        
        const {usuario, senha} = data;
        if (!usuario || usuario == "") {
            toast.dismiss();
            errors.usuario = "Usuário é obrigatório"
            return;
        }
        if (!senha || senha == "") {
            toast.dismiss();
            errors.senha = "Senha é obrigatório"
            return;
        }

        const response: apiResponse = await ajax("/auth/login", "post", data); 
        
        toast.dismiss();
        if (response.status == "error") {
            toast.error(response.message);
            return;  
        }
        if (response.status == "success") {
            navigate("/");
            return;
        }

        toast.error("Erro inesperado");
        return;
    };


    return (
        <div className=" flex justify-center w-screen h-screen bg-custom-pink" >
            <Toaster/>
            <div className="flex flex-col box-border items-center justify-center " >
                <div className="w-1/6 h-1/6 mb-32" >
                    <img src="../public/images/renascer_logo.png" alt="" className="" />
                </div>
                <form id="login" action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="gap-5  flex flex-col w-full">
                        <Input register={register} name="usuario" placeholder="Usuário" title="Usuário" errors={errors.usuario} />
                        <Input register={register} name="senha" placeholder="Senha" title="Senha" errors={errors.senha} tipo="password" />
                    </div>
                    <div className="mt-12 w-full">
                        <Button form="login" name="login" title="Entrar" type="submit"  />
                    </div>
                </form>
            </div>
            <Toaster></Toaster>
        </div>
    )
}