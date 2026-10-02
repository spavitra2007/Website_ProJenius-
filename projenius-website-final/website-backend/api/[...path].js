import { createConnectedApp } from "../server/app.mjs";

let appPromise;

export default async function handler(req, res) {
  if (req.url === "/api/health" || req.url?.startsWith("/api/health?")) {
    res.status(200).json({ ok: true, service: "projenius-api" });
    return;
  }

  try {
    appPromise ||= createConnectedApp();
    const app = await appPromise;
    return app(req, res);
  } catch (error) {
    console.error("Failed to handle API request.");
    console.error(error);
    res.status(500).json({
      error: error.message || "API server failed to start.",
    });
  }
}
