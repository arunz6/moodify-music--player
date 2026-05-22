import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { AuthProvider } from "./feature/auth/auth.context";
import { SongconstextProvider } from "./feature/home/song.contex";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <SongconstextProvider>
          <RouterProvider router={router} />
        </SongconstextProvider>
      </AuthProvider>
    </>
  );
}

export default App;
