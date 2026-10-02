import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { connectDatabase, isDatabaseConnected } from "./config/db.mjs";
import { blogRouter } from "./routes/blogs.mjs";
import { newsletterRouter } from "./routes/newsletter.mjs";
import { courseRouter } from "./routes/courses.mjs";

export function createApp() {
  const app = express();
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use("/uploads", express.static(path.resolve(__dirname, "../uploads"), { maxAge: "30d" }));
  const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";

  app.use(
    cors({
      origin: CLIENT_ORIGIN === "*" ? true : CLIENT_ORIGIN.split(","),
    }),
  );
  app.use(express.json({ limit: process.env.API_JSON_LIMIT || "12mb" }));

  app.get("/api/health", (req, res) => {
    const databaseConnected = isDatabaseConnected();

    res.status(databaseConnected ? 200 : 503).json({
      ok: databaseConnected,
      service: "projenius-api",
      database: databaseConnected ? "connected" : "disconnected",
    });
  });

  app.use("/api", (req, res, next) => {
    if (req.path === "/health") {
      next();
      return;
    }

    if (!isDatabaseConnected()) {
      res.status(503).json({
        error: "MongoDB is not connected. Check MONGODB_URI and MongoDB Atlas Network Access.",
        code: "DATABASE_UNAVAILABLE",
      });
      return;
    }

    next();
  });

  app.use("/api/blogs", blogRouter);
  app.use("/api/newsletter", newsletterRouter);
  app.use("/api/courses", courseRouter);
  app.use((req, res) => {
    res.status(404).json({ error: "Not found." });
  });

  app.use((error, req, res, _next) => {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  });

  return app;
}

export async function createConnectedApp() {
  await connectDatabase();
  return createApp();
}
