import { Router } from "express";

const router = Router();

let settings = {
  workTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
};

router.get("/", (_, res) => {
  res.json(settings);
});

router.put("/", (req, res) => {
  settings = req.body;
  res.json(settings);
});

export default router;