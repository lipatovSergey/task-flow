import styled from "styled-components";
import type { Task } from "../features/tasks/tasksTypes";

interface TaskCardProps {
  task: Task;
  onDelete: (id: Task["id"]) => void;
  activeCardId: string | null;
  setActiveCardId: React.Dispatch<React.SetStateAction<string | null>>;
  setTaskToEdit: React.Dispatch<React.SetStateAction<Task | null>>;
  setIsEditTaskFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskCardWrapper = styled.li`
  position: relative;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const TaskCardContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1d3074;
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
`;

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
`;

const TaskCard = ({
  task,
  onDelete,
  activeCardId,
  setActiveCardId,
  setTaskToEdit,
  setIsEditTaskFormOpen,
}: TaskCardProps) => {
  const handleDeleteBtnClick = () => {
    onDelete(task.id);
  };

  const handleTaskEditBtnClick = () => {
    setTaskToEdit(task);
    setIsEditTaskFormOpen(true);
  };

  return (
    <TaskCardWrapper
      // must stop propagation, because of global listener. Without it global listener will work before onClick inside component
      onMouseDown={(e) => e.stopPropagation()}
      onClick={() => {
        if (activeCardId !== task.id) {
          setActiveCardId(task.id);
        }
      }}
    >
      <TaskCardContent>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <span>{task.createdAt.toLocaleString()}</span>
      </TaskCardContent>
      {task.id === activeCardId && (
        <BtnsWrapper>
          <button
            type="button"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={handleTaskEditBtnClick}
          >
            ✏️
          </button>
          <button
            type="button"
            // must stop propagation, because of global listener. Without it global listener will work before onClick inside component
            onMouseDown={(e) => e.stopPropagation()}
            onClick={handleDeleteBtnClick}
          >
            ❌
          </button>
        </BtnsWrapper>
      )}
    </TaskCardWrapper>
  );
};

export default TaskCard;
