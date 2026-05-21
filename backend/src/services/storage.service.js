import ImageKit from "@imagekit/nodejs";
import config from "../config/config.js";

const client = new ImageKit({
  privateKey: config.privateKey,
});

async function uploadFile({ buffer, filename, folder = "" }) {
  const file = await client.files.upload({
    file: await ImageKit.toFile(Buffer.from(buffer)),
    fileName: filename,
    folder,
  });

  return file;
}

export default { uploadFile };
