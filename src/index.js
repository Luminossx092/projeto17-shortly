import express, { json } from "express";
import dotenv from "dotenv"
import cors from "cors"
import signRouter from "./Routers/SignRouter.js"
dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use(signRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));