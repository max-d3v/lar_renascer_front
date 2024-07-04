import { Header } from "./header"
import { Outlet } from "react-router-dom"
import { useLocation } from 'react-router-dom';

export function Layout() {
    const location = useLocation();
    const pathname = location.pathname.startsWith('/') ? location.pathname.substring(1) : location.pathname;
    var capitalizedPathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);


    var buttonType = "voltar";
    if (capitalizedPathname == "") {
        buttonType = "sair";
    }
    if (capitalizedPathname.includes("Benfeitor") ) {
        capitalizedPathname = "Benfeitor";
    }
    if (capitalizedPathname.includes("Acolhidas/registro") ) {
        capitalizedPathname = "Registro de Acolhidas"
    }


    return (
        <>
        <Header title={capitalizedPathname} buttonType={buttonType}  />
        <Outlet/>
        </>
    )
}