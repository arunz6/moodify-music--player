import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { AuthProvider } from "./feature/auth/auth.context";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
      <RouterProvider router={router}/>
      </AuthProvider>
     
      
    </>
  );
}

export default App;
