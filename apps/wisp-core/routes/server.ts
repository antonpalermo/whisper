import express from "express";

const server: express.Router = express.Router();

server.get("/health", (_, res) => {
  const status = {
    status: "healthy",
    timestamp: Date.now(),
    uptime: process.uptime(),
    message: "server is running and listening for api calls",
  };

  return res.status(200).json(status);
});

export default server;
