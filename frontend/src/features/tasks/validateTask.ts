import type { Task } from "./tasksTypes";

export function validateTask(data: unknown): asserts data is Task {
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid task: not an object");
  }

  // data is object, that means, task is link to the same object in memory
  // when we change task fields we also change data fields
  const task = data as {
    id: unknown;
    title: unknown;
    description: unknown;
    status: unknown;
    priority: unknown;
    createdAt: unknown;
  };

  if (typeof task.id !== "string") {
    throw new Error("Invalid task: id must be a string");
  }

  if (typeof task.title !== "string") {
    throw new Error("Invalid task: title must be a string");
  }

  if (typeof task.description !== "string") {
    throw new Error("Invalid task: description must be a string");
  }

  if (!["ToDo", "InProgress", "Done"].includes(task.status as string)) {
    throw new Error("Invalid task: status must be ToDo, InProgress or Done");
  }

  if (![1, 2, 3].includes(task.priority as number)) {
    throw new Error("Invalid task: priority must be 1, 2 or 3");
  }

  if (typeof task.createdAt !== "string") {
    throw new Error("Invalid task: createdAt must be a string");
  }

  const parsedDate = new Date(task.createdAt);
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid task: createdAt is not a valid date string");
  }

  // Приводим createdAt к настоящему объекту Date
  task.createdAt = parsedDate;
}
