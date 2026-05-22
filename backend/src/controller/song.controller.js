import songModel from "../models/song.model.js";
import id3 from "node-id3";
import storageService from "../services/storage.service.js";

async function uplodesong(req, res) {
    const filebuffer = req.file.buffer;
    const { mood } = req.body;

    const tags = id3.read(filebuffer);

    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: filebuffer,
            filename: tags.title + ".mp3",
            folder: "/cohort-2/moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/cohort-2/moodify/posters"
        })
    ])


    const song = await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterurl: posterFile.url,
        mood,
    });
    res.status(201).json({
        message: "song uploded successfully",
        song: song,
    });
}




async function getSong(req, res) {

    const { mood } = req.query

    const song = await songModel.findOne({
        mood,
    })

    res.status(200).json({
        message: "song fetched successfully.",
        song,
    })

}
export default { uplodesong, getSong };
