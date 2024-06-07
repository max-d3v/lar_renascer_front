import { useNavigate } from "react-router-dom"

export function BenfeitoresMenu() {
    const navigate = useNavigate();

    return (
        <div className=" customPink w-screen pageHeight flex items-center justify-center gap-20 " >
            <div onClick={() => navigate("/benfeitores/registro/juridica")} className="cursor-pointer text-3xl w-1/6 h-2/6 flex items-center justify-center font-semibold text-white bg-pink-800 p-2 transition-all duration-300 hover:scale-105 rounded-lg">
                Pessoa Jurídica
            </div>
            <div onClick={() => navigate("/benfeitores/registro/fisica")} className="cursor-pointer text-3xl w-1/6 h-2/6 flex items-center justify-center font-semibold text-white bg-pink-800 p-2 transition-all duration-300 hover:scale-105 rounded-lg">
                Pessoa Física
            </div>
        </div>
    )
}