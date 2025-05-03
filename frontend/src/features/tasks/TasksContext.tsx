import { createContext, useContext } from "react";
import { Task } from "./tasksTypes";

export type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "SET_TASKS"; payload: Task[] };

export interface TaskState {
  tasks: Task[] | null;
}

export const TaskContext = createContext<TaskState | undefined>(undefined);
export const TaskDispatchContext = createContext<
  React.Dispatch<TaskAction> | undefined
>(undefined);

export const useTaskState = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskState must be used within a TaskProvider");
  }
  return context;
};

export const useTaskDispatch = () => {
  const context = useContext(TaskDispatchContext);
  if (context === undefined) {
    throw new Error("useTaskDispatch must be used within a TaskProvider");
  }
  return context;
};
