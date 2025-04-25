import { Router } from "express";
import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} from "../controllers/taskController";

const router = Router();

router.post("/", createTask);
router.get("/", getTasks);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);

export default router;
