import React, { useState } from "react";
import type { Task } from "../features/tasks/tasksTypes";
import {
  BackDrop,
  TaskFormModal,
  Form,
  ErrorSpan,
  CloseModalBtn,
} from "./FormStyles";

interface TaskEditFormProps {
  task: Task | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onTaskEdit: (task: Task) => void;
}

const TaskEditForm = ({ task, setIsOpen, onTaskEdit }: TaskEditFormProps) => {
  // state for errors in form fields
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
  });

  if (!task) return <p>Error: task not found</p>;

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as Task["status"];
    const priority = Number(formData.get("priority")) as Task["priority"];

    // object that contain catched errors
    const newErrors = { title: "", description: "", status: "", priority: "" };

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!["ToDo", "InProgress", "Done"].includes(status)) {
      newErrors.status = "Invalid status";
    }

    if (![1, 2, 3].includes(priority)) {
      newErrors.priority = "Invalid priority";
    }
    // check if there any errors in newErrors
    const hasErrors = Object.values(newErrors).some((msg) => msg !== "");
    // if there any errors in newErrors set errors state to newErrors object
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    const updatedTask: Task = {
      id: task.id,
      title,
      description,
      status,
      priority,
      createdAt: new Date(),
    };

    onTaskEdit(updatedTask);
    // reset errors
    setErrors({
      title: "",
      description: "",
      status: "",
      priority: "",
    });
    setIsOpen(false);
  };

  return (
    <BackDrop>
      <TaskFormModal>
        <Form onSubmit={handleFormSubmit}>
          <div className="fields">
            <label htmlFor="title">Title</label>
            {errors.title && <ErrorSpan>{errors.title}</ErrorSpan>}
            <input name="title" id="title" defaultValue={task.title} />
            <label htmlFor="description">Description</label>
            {errors.description && <ErrorSpan>{errors.description}</ErrorSpan>}
            <input name="description" defaultValue={task.description} />
            <label htmlFor="status">Status</label>
            {errors.status && <ErrorSpan>{errors.status}</ErrorSpan>}
            <select name="status" id="status" defaultValue={task.status}>
              <option value="ToDo">To Do</option>
              <option value="InProgress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <label htmlFor="priority">Priority</label>
            {errors.priority && <ErrorSpan>{errors.priority}</ErrorSpan>}
            <select name="priority" id="priority" defaultValue={task.priority}>
              <option value="1">High</option>
              <option value="2">Regular</option>
              <option value="3">Low</option>
            </select>
          </div>
          <button type="submit">Edit Task</button>
        </Form>
        <CloseModalBtn onClick={() => setIsOpen(false)}>X</CloseModalBtn>
      </TaskFormModal>
    </BackDrop>
  );
};

export default TaskEditForm;
