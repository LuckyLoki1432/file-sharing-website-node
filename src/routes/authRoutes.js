import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/login', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'login.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'register.html'));
});

export default router;
