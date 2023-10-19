import express from "express";
import { Application } from "express";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
