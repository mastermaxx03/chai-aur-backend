// require('dotenv').config({path: './env'}) // This is one way, but we will use the import syntax
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

console.log("--- [index.js] Starting server execution. ---");

dotenv.config({
  path: "./.env",
});

console.log(`--- [index.js] PORT from .env is: ${process.env.PORT}`);
const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR after DB connection: ", error);
      throw error;
    });

    app.listen(port, () => {
      console.log(`✅ Server is running at port : ${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
