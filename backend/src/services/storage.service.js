import fs from 'fs';
import ImageKit, { toFile } from '@imagekit/nodejs';
import config from "../config/config.js";


const client = new ImageKit({
 
  privateKey: config.privateKey ,

}); 


async function uplodefile({buffer,filename}){
  file:await client.file.upload({
    file: buffer,
    fileName: filename,
  })
  return file;
} 



export default {uplodefile};