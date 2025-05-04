import { useReducer } from "react";
import { TaskContext, TaskDispatchContext } from "./TasksContext";
import { tasksReducer } from "./tasksReducer";
import { Task } from "./tasksTypes";

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(tasksReducer, { tasks: null });

  return (
    <TaskContext.Provider value={state}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskContext.Provider>
  );
};
