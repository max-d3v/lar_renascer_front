import { Button } from "./button"
import { useNavigate } from "react-router-dom"
import { ajax } from "../ajax/ajax.mts";
interface HeaderProps {
    buttonType?: string;
    title: string;
}

export function Header({buttonType, title}: HeaderProps) {
    const navigate = useNavigate();
    const deleteAllCookies = () => {
        const cookies = document.cookie.split(";");
      
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
    }

    const logout = async () => {
        localStorage.clear();
        sessionStorage.clear();
        deleteAllCookies();
        const response = await ajax("/auth/logout", "get", null);
        navigate("/login");
    }

    const voltar = () => {
        navigate(-1);
    }

    return (
        <div className="w-full headerHeight customBrown flex items-center justify-between px-4 box-border w- ">
            <div className="customWidth cursor-pointer" onClick={() => navigate("/")} >
                <img src="../public/images/renascer_logo.png" alt=""  />
            </div>
            <p className="font-semibold text-white text-4xl" >{title}</p>
            <div className="w-1/6" >
                <Button name="botaoHeader" title={ buttonType == "sair" ? "Sair" : "Voltar" } size=" w-24 " customCss="text-xl" onClick={ buttonType == "sair" ? () => logout() : () => voltar() } />
            </div>
            </div>
    )
}