import styled from "styled-components";
import type { Task } from "../features/tasks/tasksTypes";
import { statusLabels } from "../features/tasks/labels";
import TaskCard from "./TaskCard";

interface ColumnProps {
  status: Task["status"]
  tasks: Task[]
  onDelete: (id: Task["id"]) => void
}

const ColumnTitle = styled.h2`
  margin: 0;
  display: inline-block;
  text-align: center;
`
const ColumnWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  background-color: #f2f2f2;
  padding: 1rem;
  border-radius: 0.5rem;
`

const TasksList = styled.ul`
  padding: 0;
  width: 100%;
  list-style: none;
`

const Column = ({ status, tasks, onDelete }: ColumnProps) => {

  const sortedTasks = [...tasks].sort((a, b) => a.priority - b.priority)

  return (
    <ColumnWrapper>
      <ColumnTitle>{statusLabels[status]}</ColumnTitle>
      <TasksList>{sortedTasks.map(task => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} />
      ))}
      </TasksList>
    </ColumnWrapper>
  )
}

export default Column
