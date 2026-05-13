import "reflect-metadata";
import express from "express";  
import cors from "cors";
import { AppDataSource } from "./dataSource";
import userRoutes from "./routes/userRoutes";
import vacationRoutes from "./routes/vacationRoutes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/requests", vacationRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Connected to the database!");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
  });