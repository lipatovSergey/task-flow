import type { Task } from "./tasksTypes";

// 🎯 Описание всех возможных действий
export type TaskAction =
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "UPDATE_TASK"; payload: Task };

// 🧠 Редьюсер для управления состоянием задач
export function tasksReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "SET_TASKS":
      return action.payload;
    case "ADD_TASK":
      return [...state, action.payload];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    case "UPDATE_TASK":
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task,
      );
    default:
      return state;
  }
}
