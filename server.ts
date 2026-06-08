import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import apiRouter from "./server/routes/api";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Register modular API routes
app.use("/api", apiRouter);

// Vite or Production Static serving configurations wrapper to support CJS esbuild compilation (eliminates top-level await error)
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Bind to port 3000 (standard reverse proxy channel)
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`WebMitra backend server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start WebMitra server:", err);
});
