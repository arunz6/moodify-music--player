import { getSong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../song.contex";


export const useSong = () => {
    const context = useContext(SongContext)

    const { song, loding, setsong, setloding } = context

    async function handleGetSong({ mood }) {
        setloding(true)
        const data = await getSong({ mood })
        
        setsong(data.song)
        setloding(false)
    }

    return ({ loding, song, handleGetSong })

}