import express from "express";
import settingsRoutes from "./routes/settings.routes";
import tasksRoutes from "./routes/tasks.routes";

const app = express();

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ ok: true });
});

app.use("/settings", settingsRoutes);
app.use("/tasks", tasksRoutes);

export default app;

import cors from "cors";

app.use(cors());