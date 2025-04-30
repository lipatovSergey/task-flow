import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";
import { Task } from "./tasksTypes";

// 🎯 Типы действий, которые может обрабатывать редьюсер
type TaskAction =
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "UPDATE_TASK"; payload: Task };

// 🧠 Редьюсер, который описывает, как состояние изменяется в ответ на действия
function tasksReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "SET_TASKS":
      return action.payload;
    case "ADD_TASK":
      return [...state, action.payload];
    case "DELETE_TASK":
      return state.filter((t) => t.id !== action.payload);
    case "UPDATE_TASK":
      return state.map((t) =>
        t.id === action.payload.id ? action.payload : t,
      );
    default:
      return state;
  }
}

// 📦 Начальное значение (может быть [])
const TasksContext = createContext<Task[] | undefined>(undefined);
const TasksDispatchContext = createContext<Dispatch<TaskAction> | undefined>(
  undefined,
);

// 💡 Компонент-провайдер оборачивает всё приложение
export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

// 👇 Хуки для использования задач и диспетчера
export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}

export function useTasksDispatch() {
  const context = useContext(TasksDispatchContext);
  if (context === undefined) {
    throw new Error("useTasksDispatch must be used within a TasksProvider");
  }
  return context;
}
