import { Input } from "../components/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { ajax, apiResponse } from "../ajax/ajax.mts";
import toast, {Toaster} from 'react-hot-toast';
export function AcolhidasRegister() {
    const { register, handleSubmit } = useForm(); 
    const [errors, setErrors] = useState<any>({});
    const [temProblemaSaude, setTemProblemaSaude] = useState(false);

    function TestaCPF(strCPF: string) {
        var Soma;
        var Resto;
        Soma = 0;
      if (strCPF == "00000000000") return false;
    
      for (var i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
    
      Soma = 0;
        for (var i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
    }

    const handleApresentaProblemaSaude = (e: any) => {
        if (e.target.value === "S") {
            setTemProblemaSaude(true);
        } else {
            setTemProblemaSaude(false);
        }
    }



    const onSubmit = async (data: any) => {

        const validaCpf = TestaCPF(data.cpf);
        if (!validaCpf) {
            var error = errors;
            error.cpf = "CPF inválido";
            setErrors(error);
        }   

        


        const response = await ajax("/acolhidas/register", "post", data)
        console.log(response)
    }

    return (
<form onSubmit={handleSubmit(onSubmit)} className="customPink px-6 flex items-center flex-col">
    <div className="w-10/12 flex justify-between gap-7 mt-12">
        <div className="w-full">
            <Input customCss="text-black" name="nome" register={register} placeholder="Nome" title="Nome" errors={errors.nome} />
        </div>
        <div className="w-full">
            <Input customCss="text-black" name="dataNascimento" register={register} placeholder="Data de Nascimento" title="Data de Nascimento" tipo="date" errors={errors.dataNascimento} />
        </div>
    </div>
    <div className="w-10/12 flex justify-between gap-7 mt-12">
        <div className="w-full">
            <Input customCss="text-black" name="rg" register={register} placeholder="RG" title="RG" errors={errors.rg} />
        </div>
        <div className="w-full">
            <Input customCss="text-black" name="estadoCivil" register={register} placeholder="Estado Civil" title="Estado Civil" errors={errors.estadoCivil} />
        </div>
    </div>
    <div className="w-10/12 flex justify-between gap-7 mt-12">
        <div className="w-full">
            <Input customCss="text-black" name="filiacaoGenitor" register={register} placeholder="Filiação Genitor" title="Filiação Genitor" errors={errors.filiacaoGenitor} />
        </div>
        <div className="w-full">
            <Input customCss="text-black" name="filiacaoGenitora" register={register} placeholder="Filiação Genitora" title="Filiação Genitora" errors={errors.filiacaoGenitora} />
        </div>
    </div>
    <div className="w-10/12 flex justify-between gap-7 mt-12">
        <div className="w-full">
            <Input customCss="text-black" name="telefone" register={register} placeholder="Telefone" title="Telefone" errors={errors.telefone} />
        </div>
        <div className="w-full">
            <span className="m-0 p-0 font-semibold text-white" >Escolaridade</span>
                <select id="Escolaridade" {...(register("Escolaridade"))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    <option value="Fundamental">Fundamental</option>
                    <option value="Fundamental_C">Fundamental - Completo</option>
                    
                    <option value="Médio">Médio</option>
                    <option value="Médio_C">Médio - Completo</option>
                    
                    <option value="Superior">Superior</option>
                    <option value="Superior_C">Superior - Completo</option>
                </select>
        </div>
    </div>
    <div className="w-10/12 flex justify-between gap-7 mt-12">
            <div className="w-full">
                <span className="m-0 p-0 font-semibold text-white" >Alfabetizada</span>
                <select id="Alfabetizada" {...(register("Alfabetizada"))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    <option value="S" selected>Sim</option>
                    <option value="N">Não</option>
                </select>
            </div>
        <div className="w-full">
            <Input customCss="text-black" name="experienciaProfissional" register={register} placeholder="Experiência Profissional" title="Experiência Profissional" errors={errors.experienciaProfissional} />
        </div>
    </div>
    <div className="w-10/12 flex justify-between gap-7 mt-12">
        <div className="w-full">
            <Input customCss="text-black" name="funcao" register={register} placeholder="Função" title="Função" errors={errors.funcao} />
        </div>
        <div className="w-full">
            <Input customCss="text-black" name="registroCarteira" register={register} placeholder="Registro Carteira" title="Registro Carteira" errors={errors.registroCarteira} />
        </div>
    </div>
    <div className="w-10/12 flex justify-between gap-7 mt-12">
        <div className="w-full">
            <Input customCss="text-black" name="saude" register={register} placeholder="Saúde" title="Saúde" errors={errors.saude} />
        </div>
        <div className="w-full">
            <Input customCss="text-black" name="pre_natal" register={register} placeholder="Pré-natal" title="Pré-natal" errors={errors.pre_natal} />
        </div>
    </div>
    <div className="w-10/12 flex justify-between gap-7 mt-12">
        <div className="w-full">
            <Input customCss="text-black" name="tempoGestacao" register={register} placeholder="Tempo de Gestação" title="Tempo de Gestação" errors={errors.tempoGestacao} />
        </div>
        <div className="w-full">
                <span className="m-0 p-0 font-semibold text-white" >Apresenta Problema de Saúde?</span>
                <select  id="apresentaProblemaSaude" {...(register("apresentaProblemaSaude", { onChange: (e: any) => handleApresentaProblemaSaude(e) }))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    <option value="S">Sim</option>
                    <option value="N" selected >Não</option>
                </select>        
        </div>
    </div>
    <div className={`w-10/12 flex justify-between gap-7 mt-12 ${temProblemaSaude ? "" : "hidden"} `}>
        <div className="w-full">
            <Input customCss="text-black" name="problemas_saude" register={register} placeholder="Problemas de Saúde" title="Problemas de Saúde" errors={errors.problemas_saude} />
        </div>
        <div className="w-full">
            <Input customCss="text-black" name="tratamentoProblemaSaude" register={register} placeholder="Tratamento Problema de Saúde" title="Tratamento Problema de Saúde" errors={errors.tratamentoProblemaSaude} />
        </div>
    </div>
    <div className="w-10/12 flex justify-between gap-7 mt-12">
        <div className="w-full">
            <Input customCss="text-black" name="portadorNecessidadesEspeciais" register={register} placeholder="Portador de Necessidades Especiais" title="Portador de Necessidades Especiais" errors={errors.portadorNecessidadesEspeciais} />
        </div>
        <div className="w-full">
            <Input customCss="text-black" name="necessidadesEspeciais" register={register} placeholder="Necessidades Especiais" title="Necessidades Especiais" errors={errors.necessidadesEspeciais} />
        </div>
    </div>
    <div className="w-10/12 flex justify-between gap-7 mt-12">
        <div className="w-full">
            <Input customCss="text-black" name="tratamentoNecessidadesEspeciais" register={register} placeholder="Tratamento Necessidades Especiais" title="Tratamento Necessidades Especiais" errors={errors.tratamentoNecessidadesEspeciais} />
        </div>
        <div className="w-full">
            <Input customCss="text-black" name="cadastroUnico" register={register} placeholder="Cadastro Único" title="Cadastro Único" errors={errors.cadastroUnico} />
        </div>
    </div>
    <div className="w-10/12 flex justify-between gap-7 mt-12">
        <div className="w-full">
            <Input customCss="text-black" name="bolsaFamilia" register={register} placeholder="Bolsa Família" title="Bolsa Família" errors={errors.bolsaFamilia} />
        </div>
        <div className="w-full">
            <Input customCss="text-black" name="valorBolsaFamilia" tipo="number" register={register} placeholder="Valor Bolsa Família" title="Valor Bolsa Família" errors={errors.valorBolsaFamilia} />
        </div>
    </div>
    <div className="w-10/12 flex justify-between gap-7 mt-12">
        <div className="w-full">
            <Input customCss="text-black" name="pensao" register={register} placeholder="Pensão" title="Pensão" errors={errors.pensao} />
        </div>
        <div className="w-full">
            <Input customCss="text-black" name="valorPensao" tipo="number" register={register} placeholder="Valor Pensão" title="Valor Pensão" errors={errors.valorPensao} />
        </div>
    </div>
    <div className="w-10/12 flex justify-between gap-7 mt-12">
        <div className="w-full">
            <Input customCss="text-black" name="historiaPregressaAtual" register={register} placeholder="História Pregressa Atual" title="História Pregressa Atual" errors={errors.historiaPregressaAtual} />
        </div>
        <div className="w-full">
            <Input customCss="text-black" name="cpf" register={register} placeholder="CPF" title="CPF" errors={errors.cpf} />
        </div>
    </div>
    <div className="w-10/12 flex justify-between gap-7 mt-12">
        <div className="w-full">
            <Input customCss="text-black" name="naturalidade" register={register} placeholder="Naturalidade" title="Naturalidade" errors={errors.naturalidade} />
        </div>
        <div className="w-full">
            <Input customCss="text-black" name="dataAcolhimento" tipo="date" register={register} placeholder="Data de Acolhimento" title="Data de Acolhimento" errors={errors.dataAcolhimento} />
        </div>
    </div>
    <div className="w-10/12 flex justify-between gap-7 mt-12 mb-8">
        <div className="w-full">
            <Input customCss="text-black" name="dataDesligamento" tipo="date" register={register} placeholder="Data de Desligamento" title="Data de Desligamento" errors={errors.dataDesligamento} />
        </div>
    </div>
    <div className="w-10/12" >
        <Button customCss="mb-12" name="cadastrar" title="Cadastrar" type="submit" /> 
    </div>
    </form>
    )
}