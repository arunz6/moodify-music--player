import { createBrowserRouter } from "react-router-dom";
import Register from "./feature/auth/pages/Register";
import Login from "./feature/auth/pages/Login";
import Protected from "./feature/auth/component/Prtected";
import Home from "./feature/home/pages/Home";


export const router = createBrowserRouter([
  {path:"/", element:<Protected><Home/></Protected>},
 
  {path:"/register", element: <Register/>},
  
  {path:"/login", element: <Login/>}
])
