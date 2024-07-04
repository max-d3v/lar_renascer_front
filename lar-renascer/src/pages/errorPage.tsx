import { useNavigate } from "react-router-dom"
import { Button } from "../components/button";
export function Error() {
    const navigate = useNavigate();
    
    return (
        <div className="w-full pageHeight flex items-center justify-center flex-col " >
            <p className="text-4xl font-semibold mb-12 " >Página não encontrada</p>
            <Button customCssDiv="w-2/12" onClick={() => navigate("/")} name="voltar" title="Voltar" customCss="w-2/12" />
        </div>
    )
}