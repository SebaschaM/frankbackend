import express from "express";
import cors from "cors";
import { connectToDatabase } from "./config/connectiondb";
import dashboardRoute from "./routes/dashboardRoute";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectToDatabase();

app.use("/api/dashboard", dashboardRoute);

app.listen(3000, () => {
  console.log("Conectado al puerto 3000 🌐");
});
