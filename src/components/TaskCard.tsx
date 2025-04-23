import { useState } from "react";
import styled from "styled-components";
import type { Task } from "../features/tasks/tasksTypes";

interface TaskCardProps {
  task: Task
  onDelete: (id: Task["id"]) => void
}

const TaskCardWrapper = styled.li`
  position: relative;
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
const BtnsWrapper = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;

  button {
    background-color: inherit;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  button:not(:last-child) {
    margin-right: 8px;
  }
`

const TaskCard = ({ task, onDelete }: TaskCardProps) => {
  const [isBtnsVisible, setIsBtnsVisible] = useState(false)
  const handleDeleteBtnClick = () => {
    onDelete(task.id)
  }

  return (
    <TaskCardWrapper onClick={() => setIsBtnsVisible(true)}>
      <TaskCardContent>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <span>{task.createdAt.toLocaleString()}</span>
      </TaskCardContent>
      {isBtnsVisible && <BtnsWrapper>
        <button type="button">✏️</button>
        <button type="button" onClick={handleDeleteBtnClick}>❌</button>
      </BtnsWrapper>
      }
    </TaskCardWrapper>
  )
}

export default TaskCard
