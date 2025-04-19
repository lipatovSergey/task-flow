import type { Task } from "./tasksTypes.ts";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Set up project structure",
    description: "Create folders, add base files, and clean up unnecessary ones",
    status: "Done",
    createdAt: new Date("2024-04-01"),
    priority: 2,
  },
  {
    id: '2',
    title: "Build Kanban column",
    description: "Create base wrapper and styling using styled-components",
    status: "Done",
    createdAt: new Date("2024-04-02"),
    priority: 3,
  },
  {
    id: '3',
    title: "Install styled-components",
    description: "Add the library and apply it in the project",
    status: "InProgress",
    createdAt: new Date("2024-04-03"),
    priority: 2,
  },
  {
    id: '4',
    title: "Render tasks by status",
    description: "Filter and display tasks in the correct column",
    status: "ToDo",
    createdAt: new Date("2024-04-04"),
    priority: 1,
  },
  {
    id: "5",
    title: "Create TaskCard component",
    description: "Design and implement a component to display a single task",
    status: "ToDo",
    createdAt: new Date("2024-04-05"),
    priority: 2,
  },
  {
    id: '6',
    title: "Prepare drag and drop",
    description: "Set up a library and test task movement",
    status: "InProgress",
    createdAt: new Date("2024-04-06"),
    priority: 1,
  },
];

