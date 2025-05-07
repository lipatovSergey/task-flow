import styled from "styled-components";
import type { Task } from "../features/tasks/tasksTypes";

// Интерфейс пропсов для компонента TaskCard
interface TaskCardProps {
  task: Task;
  onDelete: (id: Task["id"]) => void;
  activeCardId: string | null;
  setActiveCardId: React.Dispatch<React.SetStateAction<string | null>>;
  setTaskToEdit: React.Dispatch<React.SetStateAction<Task | null>>;
  setIsEditTaskFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Стилизация обёртки карточки задания
const TaskCardWrapper = styled.li`
  position: relative;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

// Стилизация содержимого карточки задания
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

// Стилизация обёртки для кнопок редактирования и удаления
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
  // Обработчик кнопки удаления
  const handleDeleteBtnClick = () => {
    onDelete(task.id);
  };

  // Обработчик кнопки редактирования
  const handleTaskEditBtnClick = () => {
    setTaskToEdit(task);
    setIsEditTaskFormOpen(true);
  };

  return (
    <TaskCardWrapper
      // Останавливаем всплытие, чтобы глобальный обработчик клика не скрыл кнопки
      onMouseDown={(e) => e.stopPropagation()}
      onClick={() => {
        // Устанавливаем текущую активную карточку только если это другая карточка
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

      {/* Кнопки редактирования и удаления отображаются только для активной карточки */}
      {task.id === activeCardId && (
        <BtnsWrapper>
          <button
            type="button"
            onMouseDown={(e) => e.stopPropagation()} // предотвращаем потерю фокуса
            onClick={handleTaskEditBtnClick}
          >
            ✏️
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.stopPropagation()} // предотвращаем скрытие при удалении
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
