import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// Configure dotenv at the very top to ensure all environment variables are loaded first
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR after DB connection: ", error);
      throw error;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`✅ Server is running at port : ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
