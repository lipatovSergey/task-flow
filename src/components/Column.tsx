import styled from "styled-components";
import type { Task } from "../features/tasks/tasksTypes";

interface ColumnProps {
  status: Task["status"]
}

const ColumnTitle = styled.h2`
  margin: 0;
  display: inline-block;
`

const Column = ({ status }: ColumnProps) => {
  return (
    <ColumnTitle>{status}</ColumnTitle>
  )
}

export default Column
