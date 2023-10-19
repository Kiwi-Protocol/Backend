import db from "./src/handlers/mongodb.handler";
import app from "./src/app";

const port = process.env.PORT || 3000;

(async () => {
  try {
    // Connect to database
    db.on("error", (error) => {
      console.error("Database connection error:", error);
    });

    db.once("open", () => {
      console.log("Connected to the database");
    });

    //start app
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err: any) {
    console.log(err);
  }
})();
