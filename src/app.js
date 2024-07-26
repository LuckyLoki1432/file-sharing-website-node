// src/app.js

import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fileRoutes from './routes/fileRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files like HTML
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'views')));

// Connect to MongoDB using mongoose
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,     // Remove this line
    useUnifiedTopology: true,  // Remove this line
    useCreateIndex: true,      // Optionally add this line if needed
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit process on database connection error
});

// Routes
app.use('/api/files', fileRoutes); // Example route for file operations

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
