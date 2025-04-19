import styled from "styled-components";
import type { Task } from "../features/tasks/tasksTypes";

interface TaskCardProps {
  task: Task
}

const TaskCardWrapper = styled.li`
width: 100%
`
const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <TaskCardWrapper>
      <p>{task.title}</p>
      <p>{task.description}</p>
    </TaskCardWrapper>
  )
}

export default TaskCard
