import styled from "styled-components";
import type { Task } from "../features/tasks/tasksTypes";

interface ColumnProps {
  status: Task["status"]
  tasks: Task[]
}

const ColumnTitle = styled.h2`
  margin: 0;
  display: inline-block;
  text-align: center;
`
const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  background-color: #f2f2f2;
  padding: 1rem;
  border-radius: 0.5rem;
`

const TasksList = styled.ul`
`

const Column = ({ status, tasks }: ColumnProps) => {
  return (
    <ColumnWrapper>
      <ColumnTitle>{status}</ColumnTitle>
      <TasksList>{tasks.map(task => (
        <li key={task.id}>
          <p>{task.title}</p>
          <p>{task.description}</p>
        </li>
      ))}</TasksList>
    </ColumnWrapper>
  )
}

export default Column
