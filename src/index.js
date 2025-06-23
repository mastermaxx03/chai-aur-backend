//require("dotenv").config({ path: "./env" });
import {} from "dotenv/config";

import connectDB from "./db/index.js";
import e from "express";
//database connection
const app = e();
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo db connection did not go through !!!", err);
  });

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
