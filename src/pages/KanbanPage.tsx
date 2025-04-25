import Column from "../components/Column";
import styled from "styled-components";
import { mockTasks } from "../features/tasks/mockData";
import { Task } from "../features/tasks/tasksTypes";
import { useState, useEffect } from "react";
import TaskAddForm from "../components/TaskAddForm";

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
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  // on first render check if there any tasks in localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      console.log(savedTasks);
      try {
        const parsed = JSON.parse(savedTasks);
        // date saved as string, must get it back to Date
        const restored = parsed.map((t: Task) => ({
          ...t,
          createdAt: new Date(t.createdAt),
        }));
        setTasks(restored);
      } catch {
        console.error("Failed to parse tasks from localStorage");
      }
    } else {
      setTasks(mockTasks);
    }
  }, []);

  // on every change in tasks save to localStorage
  useEffect(() => {
    if (tasks !== null) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // global eventListener for clicks outside of activeCardId
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveCardId(null);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    // clean up function guarantee that every listener will be removed on component unmount
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const addTask = (task: Task) => {
    setTasks((prev) => (prev ? [...prev, task] : [task]));
  };

  const deleteTask = (id: Task["id"]) => {
    console.log(id);
    setTasks((prev) => (prev ? prev.filter((t) => t.id !== id) : prev));
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
          />
        ))}
      </Wrapper>
    </Section>
  );
};

export default KanbanPage;
