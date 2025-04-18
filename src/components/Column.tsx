import type { Task } from "../features/tasks/tasksTypes";

interface ColumnProps {
  status: Task["status"]
}

const Column = ({ status }: ColumnProps) => {
  return (
    <h2>{status}</h2>
  )
}

export default Column
