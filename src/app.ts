import express from "express";
import { Application } from "express";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const apiVersion = "1.0.0";
const apiPrefix = `/api/${apiVersion}`;

//routes
import healthRouter from "./router/health/api.health";
app.use(`${apiPrefix}/health`, healthRouter);

export default app;
