import { createBrowserRouter } from "react-router-dom";
import { Home } from './pages/home';
import { Layout } from './components/layout';
import { Login } from './pages/login';
import { Acolhidas } from "./pages/acolhidas";
import { Benfeitores } from "./pages/benfeitores";
import { BenfeitoresMenu } from "./pages/benfeitoresMenu";
import { BenfeitoresRegister } from "./pages/benfeitoresRegistro";
import { Error } from "./pages/errorPage";
import { AcolhidasRegister } from "./pages/acolhidasRegister";
import { Private } from "./routes/private";
const router = createBrowserRouter([
  {
    
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Private><Home/></Private>
      },
      {
        path: "/acolhidas",
        element:<Private><Acolhidas/></Private>
      },
      {
        path: "/acolhidas/registro",
        element: <Private><AcolhidasRegister/></Private>
      },
      {
        path: "/benfeitores",
        element: <Private><Benfeitores/></Private>
      },
      {
        path: "/benfeitores/menu",
        element: <Private><BenfeitoresMenu/></Private>
      },
      {
        path: "/benfeitores/registro/:tipo",
        element: <Private><BenfeitoresRegister/></Private>
      },
      {
        path: "*",
        element: <Error/>
      }
    ]
  },
  {
    element: <Login/>,
    path: "/login"
  },
  
])

export { router } ;