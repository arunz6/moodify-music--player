import { createContext } from "react";

import { useState } from "react";

export const SongContext = createContext();

export const SongconstextProvider = ({ children }) => {
  let [song, setsong] = useState("");
  let [loding, setloding] = useState(false);

  return (
    <SongContext.Provider value={{ song, loding, setsong, setloding }}>
      {children}
    </SongContext.Provider>
  );
};
