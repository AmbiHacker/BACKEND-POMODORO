import { Router } from "express";

const router = Router();

let tasks: any[] = [];

router.get("/", (_, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const task = {
    id: Date.now().toString(),
    ...req.body,
  };

  tasks.push(task);

  res.status(201).json(task);
});

router.patch("/:id/complete", (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completeDate = Date.now();

  res.json(task);
});

router.patch("/:id/interrupt", (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.interruptDate = Date.now();

  res.json(task);
});

router.delete("/", (_, res) => {
  tasks = [];
  res.status(204).send();
});

export default router;