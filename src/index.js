//require("dotenv").config({ path: "./env" });
import {} from "dotenv/config";

import connectDB from "./db/index.js";

//database connection

connectDB();

/*import e from "express";
const app = e()(async () => {
  try {
    mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERRR:", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error: ", error);
    throw err;
  }
})();
*/
