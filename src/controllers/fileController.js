import path from 'path';
import fs from 'fs';

const dataStore = {}; // In-memory storage, use a database for production

export const uploadFile = (req, res) => {
    const code = req.code;
    const filePath = req.file ? path.join('uploads', code, req.file.originalname) : null;
    const text = req.body.text || null;

    dataStore[code] = { filePath, text };

    res.send(`Your code is: ${code}`);
};

export const retrieveFile = (req, res) => {
    const { code } = req.params;
    const data = dataStore[code];

    if (data) {
        res.json(data);
    } else {
        res.status(404).send('Code not found');
    }
};

export const downloadFile = (req, res) => {
    const { code } = req.params;
    const data = dataStore[code];

    if (data && data.filePath) {
        res.download(path.join(process.cwd(), data.filePath));
    } else {
        res.status(404).send('File not found');
    }
};

export const viewFile = (req, res) => {
    const { code } = req.params;
    const data = dataStore[code];

    if (data && data.filePath) {
        res.sendFile(path.join(process.cwd(), data.filePath));
    } else {
        res.status(404).send('File not found');
    }
};
