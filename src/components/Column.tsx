import styled from "styled-components";
import type { Task } from "../features/tasks/tasksTypes";

interface ColumnProps {
  status: Task["status"]
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

const Column = ({ status }: ColumnProps) => {
  return (
    <ColumnWrapper>
      <ColumnTitle>{status}</ColumnTitle>
    </ColumnWrapper>
  )
}

export default Column
