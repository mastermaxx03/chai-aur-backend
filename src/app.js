import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

console.log("--- [app.js] File loaded and is being executed. ---");

const app = express();

// Middleware setup
console.log("--- [app.js] Setting up middleware (CORS, JSON, etc.). ---");
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Middleware to log all incoming requests
app.use((req, _res, next) => {
  console.log(`--> [INCOMING REQUEST]: ${req.method} - ${req.originalUrl}`);
  next();
});

// --- ROUTES ---

// Import the router
console.log("--- [app.js] Importing user router... ---");
import userRouter from "./routes/user.routes.js";

// Declare the route
console.log("--- [app.js] Mounting user router at '/api/v1/users'. ---");
app.use("/api/v1/users", userRouter);

// Example of how to access the route in Postman:
// http://localhost:8000/api/v1/users/register

export { app };
