import React, { useState } from "react";
import styled from "styled-components"
import type { Task } from "../features/tasks/tasksTypes";

interface TaskFormProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onTaskAdd: (task: Task) => void;
}

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`

const TaskFormModal = styled.div`
  position: relative;
  padding: 8px;
  background-color: white;
  border-radius: 8px;
  max-width: 500px;
  min-height: 250px;
  width: 90%;
  z-index: 1000;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;

  .fields {
    display: flex;
    flex-direction: column;
  }

  .fields :is(input, select):not(:last-child) {
    margin-bottom: 8px;
  }

  button {
    margin-top: 16px;
  }
`
const CloseModalBtn = styled.button`
  position: absolute;
  right: -10px;
  top: -10px;
`
const ErrorSpan = styled.span`
  color: #e60000 ;
  font-size: 12px;
`
const TaskForm = ({ isOpen, setIsOpen, onTaskAdd }: TaskFormProps) => {

  // state for errors in form fields
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
  })

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const status = formData.get("status") as Task["status"]
    const priority = Number(formData.get("priority")) as Task["priority"]

    // object that contain catched errors
    const newErrors = { title: '', description: '', status: '', priority: '' }

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!["ToDo", "InProgress", "Done"].includes(status)) {
      newErrors.status = "Invalid status"
    }

    if (![1, 2, 3].includes(priority)) {
      newErrors.priority = "Invalid priority"
    }
    // check if there any errors in newErrors
    const hasErrors = Object.values(newErrors).some(msg => msg !== '')
    // if there any errors in newErrors set errors state to newErrors object
    if (hasErrors) {
      setErrors(newErrors)
      return
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status,
      priority,
      createdAt: new Date(),
    }

    onTaskAdd(newTask)
    // reset errors
    setErrors({
      title: '',
      description: '',
      status: '',
      priority: '',
    })
    setIsOpen(false)
  }

  return (
    <BackDrop >
      <TaskFormModal>
        <Form onSubmit={handleFormSubmit}>
          <div className="fields">
            <label htmlFor="title">Title</label>
            {errors.title && <ErrorSpan>{errors.title}</ErrorSpan>}
            <input name="title" id="title" />
            <label htmlFor="description">Description</label>
            {errors.description && <ErrorSpan>{errors.description}</ErrorSpan>}
            <input name="description" />
            <label htmlFor="status">Status</label>
            {errors.status && <ErrorSpan>{errors.status}</ErrorSpan>}
            <select name="status" id="status">
              <option value="ToDo">To Do</option>
              <option value="InProgress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <label htmlFor="priority">Priority</label>
            {errors.priority && <ErrorSpan>{errors.priority}</ErrorSpan>}
            <select name="priority" id="priority">
              <option value='1'>High</option>
              <option value='2'>Regular</option>
              <option value='3'>Low</option>
            </select>
          </div>
          <button>Add Task</button>
        </Form>
        <CloseModalBtn onClick={() => setIsOpen(false)}>X</CloseModalBtn>
      </TaskFormModal>
    </BackDrop>
  )
}

export default TaskForm
