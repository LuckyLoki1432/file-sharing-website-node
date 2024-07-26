import multer from 'multer';
import { nanoid } from 'nanoid';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const code = nanoid();
        const dir = path.join(process.cwd(), 'uploads', code);
        fs.mkdirSync(dir, { recursive: true });
        req.code = code;  // Store the generated code in the request object
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

export default upload;
