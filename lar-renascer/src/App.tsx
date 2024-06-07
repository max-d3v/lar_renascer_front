import { createBrowserRouter } from "react-router-dom";
import { Home } from './pages/home';
import { Layout } from './components/layout';
import { Login } from './pages/login';
import { Acolhidas } from "./pages/acolhidas";
import { Benfeitores } from "./pages/benfeitores";
import { BenfeitoresMenu } from "./pages/benfeitoresMenu";
import { BenfeitoresRegister } from "./pages/benfeitoresRegistro";
const router = createBrowserRouter([
  {
    
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/acolhidas",
        element:<Acolhidas/>
      },
      {
        path: "/benfeitores",
        element:<Benfeitores/>
      },
      {
        path: "/benfeitores/menu",
        element: <BenfeitoresMenu/>
      },
      {
        path: "/benfeitores/registro/:tipo",
        element: <BenfeitoresRegister/>
      }
    ]
  },
  {
    element: <Login/>,
    path: "/login"
  }
])

export { router } ;