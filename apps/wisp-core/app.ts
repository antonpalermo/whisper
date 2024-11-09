import path from "node:path";

import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

import serverRoutes from "./routes/server";

const app: express.Express = express();

app.disable("x-powered-by");

app.use(logger("dev"));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/server", serverRoutes);

export default app;
