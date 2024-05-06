import { Input } from "../components/input"
import { Button } from "../components/button"
import { useForm } from "react-hook-form"
import { useState } from "react";
import { ajax } from "../ajax/ajax";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast' 

export function Login() {
    const { register, handleSubmit } = useForm();
    const [errors, setErrors] = useState<any>({})
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        toast.dismiss();
        toast.loading("Autenticando");

        const {usuario, senha} = data;
        if (!usuario || usuario == "") {
            errors.usuario = "Usuário é obrigatório"
        }
        if (!senha || senha == "") {
            errors.senha = "Senha é obrigatório"
        }

        const response = await ajax("/auth/login", "post", data); 
        if (!response) {
            toast.dismiss();
            toast.error("Erro inesperado!");
        }
        if (response.status == "error") {
            toast.dismiss();
            toast.error(response.message);
        }
        if (response.status == "success") {
            toast.dismiss();
            navigate("/");
        }

        toast.dismiss();
        toast.error("Erro inesperado!");



    };


    return (
        <div className=" flex justify-center w-screen h-screen bg-custom-pink" >
            <div className="flex flex-col " >
                <div className="w-72 h-72 mb-12 mt-28" >
                    <img src="../public/images/renascer_logo.png" alt="" />
                </div>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="gap-4 mt-12  flex flex-col w-full">
                    <Input register={register} name="usuario" placeholder="Usuário" title="Usuário" />
                    <Input register={register} name="senha" placeholder="Senha" title="Senha" />
                </div>
                <div className="mt-12 w-full">
                    <Button name="login" title="Entrar" />
                </div>
                </form>
            </div>
            <Toaster></Toaster>
        </div>
    )
}