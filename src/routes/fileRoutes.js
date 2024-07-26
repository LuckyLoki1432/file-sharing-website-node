import { Router } from 'express';
import upload from '../middlewares/multerConfig.js';
import { uploadFile, retrieveFile, downloadFile, viewFile } from '../controllers/fileController.js';

const router = Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/retrieve/:code', retrieveFile);
router.get('/download/:code', downloadFile);
router.get('/view/:code', viewFile);

export default router;
