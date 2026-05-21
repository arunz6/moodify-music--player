import songModel from "../models/song.model.js";
import id3 from "node-id3";
import storageService from "../services/storage.service.js";

async function uplodesong(req, res) {
  const filebuffer = req.file.buffer;
  const { mood } = req.body;
  const tags = id3.read(req.file.buffer);

  const file = await storageService.uplodefile({
    buffer: filebuffer,
    filename: tags.title + ".mp3",
  });
  const poster = await storageService.uplodefile({
    buffer: tags.image.imageBuffer,
    filename: tags.title + ".jpeg",
  });

  const song = await songModel.create({
    title: tags.title,
    url: file.url,
    posterurl: poster.url,
    mood,
  });
  res.status(201).json({
    message: "song uploded successfully",
    song: song,
  });
}
export default { uplodesong };
