import { createBrowserRouter } from "react-router-dom";
import Register from "./feature/auth/pages/Register";
import Login from "./feature/auth/pages/Login";
import Protected from "./feature/auth/component/Prtected";


export const router = createBrowserRouter([
  {path:"/", element:<Protected><h1>Home Page</h1></Protected>},
 
  {path:"/register", element: <Register/>},
  {path:"/login", element: <Login/>}
])
