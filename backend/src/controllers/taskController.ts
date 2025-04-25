import { Request, Response, NextFunction, RequestHandler } from "express";
import { tasks, Task } from "../models/task";

export const getTasks: RequestHandler = (req, res, next) => {
  try {
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const createTask: RequestHandler = (req, res, next) => {
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

export const updateTask: RequestHandler = (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;

    const task = tasks.find((t) => t.id === id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    if (!title || !description || !status || !priority) {
      res.status(400).json({ message: "Missing required fields" });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;

    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const deleteTask: RequestHandler = (req, res, next) => {
  try {
    const { id } = req.params;
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    const deleted = tasks.splice(index, 1)[0];
    res.json(deleted);
  } catch (error) {
    next(error);
  }
};
