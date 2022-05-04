import { diskStorage } from "multer";
import {v4 as uuidv4} from 'uuid';

import { readFile,createReadStream } from 'fs';

import {fileTypeFromFile} from 'file-type';


import path = require('path');


type valideFileExtension = 'png' | 'jpg' | 'jpeg'; 

type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const valideFileExtensions:valideFileExtension[ ] = ['png' , 'jpg' , 'jpeg']

const validMimeTypes:validMimeType[ ] = ['image/png','image/jpg','image/jpeg']

export const saveImageToStorage =  {
    storage:diskStorage({
        destination:'./images',
        filename:(req,file,callback)=>{
            const fileExtension:string = path.extname(file.originalname)
            const fileName:string = uuidv4() + fileExtension
            callback(null,fileName)
        }
    }),
    fileFilter:(req,file,callback)=>{
        const allowedMimeTypes: validMimeType[ ] = validMimeTypes
        allowedMimeTypes.includes(file.mimetype) ? callback(null,true) : callback(null,false)
    }
    
}
