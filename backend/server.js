import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoute from "./routes/AI.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", aiRoute);

app.listen(3001, () => {
  console.log("AI server running on port 3001");
});