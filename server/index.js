import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//import routes
import collectionRoutes from "./routes/collection.js";

const app = express();
dotenv.config();

//middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

//use router
app.use("/collections", collectionRoutes);

//db
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_ADDRESS, dbOptions)
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
