import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (_, res) => {
  let settings = await prisma.settings.findFirst();

  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        workTime: 25,
        shortBreakTime: 5,
        longBreakTime: 15,
      },
    });
  }

  res.json(settings);
});

router.put("/", async (req, res) => {
  const { workTime, shortBreakTime, longBreakTime } = req.body;

  const current = await prisma.settings.findFirst();

  if (!current) {
    const created = await prisma.settings.create({
      data: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });

    return res.json(created);
  }

  const updated = await prisma.settings.update({
    where: { id: current.id },
    data: {
      workTime,
      shortBreakTime,
      longBreakTime,
    },
  });

  res.json(updated);
});

export default router;