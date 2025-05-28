import express from "express";
import cookieParser from "cookie-parser";

const app = new express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

import bookRouter from "../src/routes/books.routes.js";
app.use("/books", bookRouter);

export { app };