import Column from "../components/Column";
import styled from "styled-components";
import { Task } from "../features/tasks/tasksTypes";
import { useState, useEffect } from "react";
import TaskAddForm from "../components/TaskAddForm";
import TaskEditForm from "../components/TaskEditForm";
import { createTask, getTasks } from "../api/taskApi";

const Section = styled.section`
  width: 1200px;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;
const statuses: Task["status"][] = ["ToDo", "InProgress", "Done"];

const KanbanPage = () => {
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false);
  const [isEditTaskFormOpen, setIsEditTaskFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  // on first render check if there any tasks in localStorage
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };

    fetchTasks();
  }, []);

  // global eventListener for clicks outside of activeCardId
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveCardId(null);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    // clean up function guarantee that every listener will be removed on component unmount
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const addTask = async (taskData: Omit<Task, "id" | "createdAt">) => {
    try {
      const newTask = await createTask(taskData);
      setTasks((prev) => (prev ? [...prev, newTask] : [newTask]));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = (id: Task["id"]) => {
    setTasks((prev) => (prev ? prev.filter((t) => t.id !== id) : prev));
  };

  const editTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev
        ? prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        : prev,
    );
  };

  console.log(activeCardId);
  return (
    <Section>
      <Wrapper>
        <button onClick={() => setIsAddTaskFormOpen(true)}>Add Task</button>
        {isAddTaskFormOpen && (
          <TaskAddForm
            isOpen={isAddTaskFormOpen}
            setIsOpen={setIsAddTaskFormOpen}
            onTaskAdd={addTask}
          />
        )}
        {isEditTaskFormOpen && (
          <TaskEditForm
            task={taskToEdit}
            isOpen={isEditTaskFormOpen}
            setIsOpen={setIsEditTaskFormOpen}
            onTaskEdit={editTask}
          />
        )}
        {statuses.map((status) => (
          <Column
            key={status}
            status={status}
            tasks={
              tasks ? tasks.filter((task) => task.status === status) : null
            }
            onDelete={deleteTask}
            activeCardId={activeCardId}
            setActiveCardId={setActiveCardId}
            setTaskToEdit={setTaskToEdit}
            setIsEditTaskFormOpen={setIsEditTaskFormOpen}
          />
        ))}
      </Wrapper>
    </Section>
  );
};

export default KanbanPage;
