import express, { json } from "express";
import dotenv from "dotenv"
import cors from "cors"
import signRouter from "./Routers/SignRouter.js"
import urlsRouter from "./Routers/UrlsRouter.js"
dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use(signRouter);
app.use(urlsRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));