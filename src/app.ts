import express from "express";
import { Application } from "express";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const apiVersion = "1.0.0";
const apiPrefix = `/api/${apiVersion}`;

//routes
app.get("/", (_, res) => {
  res.send("Hello World!");
});

import healthRouter from "./router/health/api.health";
app.use(`${apiPrefix}/health`, healthRouter);

import kiwiAvatarRouter from "./router/kiwiAvatars/api.kiwiAvatars";
app.use(`${apiPrefix}/kiwiAvatars`, kiwiAvatarRouter);

import userRouter from "./router/users/api.users";
app.use(`${apiPrefix}/users`, userRouter);

export default app;
