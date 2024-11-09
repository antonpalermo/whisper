#!/usr/bin/env node

import app from "../app";

import http from "node:http";
import createLoggerMessage from "debug";

const normalizePort = (value: string) =>
  isNaN(+value) ? value : +value >= 0 ? +value : false;

const server = http.createServer(app);
const logger = createLoggerMessage("wisp-core:app");

const port = normalizePort(process.env.PORT || "3550");
app.set("port", port);

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  logger(" " + bind);
}

server.listen(port);

server.on("error", (e) => {
  logger(e);
});
server.on("listening", onListening);
