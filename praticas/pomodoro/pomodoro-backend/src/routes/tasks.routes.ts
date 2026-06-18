import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

function serializeTask(task: any) {
  return {
    ...task,
    startDate: Number(task.startDate),
    completeDate: task.completeDate
      ? Number(task.completeDate)
      : null,
    interruptDate: task.interruptDate
      ? Number(task.interruptDate)
      : null,
  };
}

router.get("/", async (_, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks.map(serializeTask));
});

router.post("/", async (req, res) => {
  const task = await prisma.task.create({
    data: {
      id: Date.now().toString(),
      name: req.body.name,
      duration: req.body.duration,
      type: req.body.type || "workTime",
      startDate: BigInt(Date.now()),
    },
  });

  res.status(201).json(serializeTask(task));
});

router.patch("/:id/complete", async (req, res) => {
  const task = await prisma.task.update({
    where: { id: req.params.id },
    data: {
      completeDate: BigInt(Date.now()),
    },
  });

  res.json(serializeTask(task));
});

router.patch("/:id/interrupt", async (req, res) => {
  const task = await prisma.task.update({
    where: { id: req.params.id },
    data: {
      interruptDate: BigInt(Date.now()),
    },
  });

  res.json(serializeTask(task));
});

router.delete("/", async (_, res) => {
  await prisma.task.deleteMany();
  res.status(204).send();
});

export default router;