import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load API Key
const geminiAPIKey = process.env.GEMINI_API_KEY;
if (!geminiAPIKey) {
  console.error("❌ GEMINI_API_KEY is missing! Add it to your .env file.");
  process.exit(1);
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(geminiAPIKey);

const PORT = process.env.PORT || 5050;

// Middleware
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Cloudinary Configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Import Routes
import RItemRouter from './routes/RItemRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import CompanyRouter from './routes/CompanyRoute.js';
import employeeRouter from './routes/EmployeeRoute.js';
import CompanyItemRoute from './routes/CompanyItem.js';
import collectedWasteRouter from './routes/collectedWasteRoute.js';
import routePathRouter from './routes/routePathRouter.js';
import vehicleRouter from './routes/vehicleRouter.js';
import requestRouter from './routes/requestRouter.js';
import BankRouter from './routes/BankRouter.js';
import paymentRouter from './routes/paymentRouter.js';
import timeTableRouter from './routes/TimeTableRouts.js';

// Public Files
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import errorHandelerMiddleware from './middleware/errorHandelerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './Client/dist')));

// **Test Route**
app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'Test route' });
});

// **Gemini AI API Route**
app.post('/api/v1/gemini', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `${process.env.GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Google API Error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received";

    res.json({ response: text });

  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});



// **Other API Routes**
app.use('/api/v1/RItems', authenticateUser, RItemRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/Company', authenticateUser, CompanyRouter);
app.use('/api/v1/employees', authenticateUser, employeeRouter);
app.use('/api/v1/CItems', authenticateUser, CompanyItemRoute);
app.use('/api/v1/waste', collectedWasteRouter);
app.use('/api/v1/routePath', routePathRouter);
app.use('/api/v1/vehicle', vehicleRouter);
app.use('/api/v1/request', requestRouter);
app.use('/api/v1/Bank', BankRouter);
app.use('/api/v1/payments', paymentRouter);
app.use('/api/v1/timetable', timeTableRouter);

// **Frontend Route (Catch-all)**
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './Client/dist', 'index.html'));
});

// **Error Handling Middleware**
app.use(errorHandelerMiddleware);
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Route not found' });
});

// **Database Connection & Server Start**
const startServer = async () => {
  try {
    const mongoUri = 'your mongoDb_url' || "your-default-mongo-uri";
    await mongoose.connect(mongoUri);
    console.log("🚀 MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Database Connection Error:", error);
    process.exit(1);
  }
};

startServer();
