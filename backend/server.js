import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import optimizerRoutes from "./routes/optimizerRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.use("/api", optimizerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});