import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleDialogflow } from "./routes/dialogflow";
import { handleDialogflowAPI } from "./routes/dialogflow-api";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Use real Dialogflow API if configured, otherwise fallback to local intent matcher
  const useRealDialogflow = process.env.DIALOGFLOW_PROJECT_ID && process.env.DIALOGFLOW_PRIVATE_KEY;
  app.post("/api/dialogflow", useRealDialogflow ? handleDialogflowAPI : handleDialogflow);

  return app;
}
