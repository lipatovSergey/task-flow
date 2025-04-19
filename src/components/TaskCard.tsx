import styled from "styled-components";
import type { Task } from "../features/tasks/tasksTypes";

interface TaskCardProps {
  task: Task
}

const TaskCardWrapper = styled.li`
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`
const TaskCardContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0cb8ca;
  padding: 8px 8px; 
  border-radius: 8px;

  h3 {
    margin: 0;
    margin-bottom: 4px;
  }

  p {
    margin: 0;
    margin-bottom: 4px;
  }

  span {
    text-align: right;
  }
`

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <TaskCardWrapper>
      <TaskCardContent>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <span>{task.createdAt.toLocaleString()}</span>
      </TaskCardContent>
    </TaskCardWrapper>
  )
}

export default TaskCard
