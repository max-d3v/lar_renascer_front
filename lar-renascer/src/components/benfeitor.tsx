import { benfeitorInfo } from "../pages/benfeitores"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export function Benfeitor({ benfeitor, index }: { benfeitor: benfeitorInfo, index: number }) {
    const formattedDate = new Date(benfeitor.dataCadastro).toLocaleDateString();
    const navigate = useNavigate();
    
    return (
        <div className={`  w-full min-h-14 flex ${index % 2 == 0 ? "fundoCinza" : "fundoBranco"} cursor-pointer transition-all duration-300 hover:scale-105  `} onClick={() => navigate(`/benfeitor/${benfeitor.id}`)} >
            <div className="w-1/4 flex items-center justify-center text-xl font-semibold" >
                {benfeitor.tipo == "fisico" ? benfeitor.nome : benfeitor.razaoSocial}
            </div>
            <div className="w-1/4 flex items-center justify-center text-xl font-semibold " >
                { benfeitor.tipo == "fisico" ? benfeitor.cpf : benfeitor.cnpj }
            </div>
            <div className="w-1/4 flex items-center justify-center text-xl font-semibold" >
                { formattedDate }
            </div>
            <div className="w-1/4 flex items-center justify-center text-xl font-semibold" >
                { benfeitor.tipo == "fisico" ? "Física" : "Jurídica"}
            </div>
        </div>
    )
}