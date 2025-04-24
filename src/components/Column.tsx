import styled from "styled-components";
import type { Task } from "../features/tasks/tasksTypes";
import { statusLabels } from "../features/tasks/labels";
import TaskCard from "./TaskCard";
import React from "react";

interface ColumnProps {
  status: Task["status"];
  tasks: Task[] | null;
  onDelete: (id: Task["id"]) => void;
  activeCardId: string | null;
  setActiveCardId: React.Dispatch<React.SetStateAction<string | null>>;
}

const ColumnTitle = styled.h2`
  margin: 0;
  display: inline-block;
  text-align: center;
`;
const ColumnWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  background-color: #f2f2f2;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const TasksList = styled.ul`
  padding: 0;
  width: 100%;
  list-style: none;
`;

const Column = ({
  status,
  tasks,
  onDelete,
  activeCardId,
  setActiveCardId,
}: ColumnProps) => {
  return (
    <ColumnWrapper>
      <ColumnTitle>{statusLabels[status]}</ColumnTitle>
      {tasks && (
        <TasksList>
          {tasks
            .sort((a, b) => a.priority - b.priority)
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={onDelete}
                activeCardId={activeCardId}
                setActiveCardId={setActiveCardId}
              />
            ))}
        </TasksList>
      )}
    </ColumnWrapper>
  );
};

export default Column;
