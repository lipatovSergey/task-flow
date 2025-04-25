import { Request, Response, NextFunction } from "express";
import { tasks, Task } from "../models/task";
import crypto from "crypto";

export const createTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, status, priority } = req.body;

    if (!title || !description || !status || !priority) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status,
      priority,
      createdAt: new Date(),
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

export const getTasks = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    tasks.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const { title, description, status, priority } = req.body;

    const task = tasks.find((t) => t.id === id);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    if (!title || !description || !status || !priority) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    task.title = title;
    task.description = description;
    task.status = status;
    task.priority = priority;

    res.json(task);
  } catch (error) {
    next(error);
  }
};
