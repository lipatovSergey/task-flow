import React, { FormEvent } from "react";
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
`
const CloseModalBtn = styled.button`
  position: absolute;
  right: -10px;
  top: -10px;
`
const TaskForm = ({ isOpen, setIsOpen, onTaskAdd }: TaskFormProps) => {

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const status = formData.get("status") as Task["status"]
    const priority = Number(formData.get("priority")) as Task["priority"]
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status,
      priority,
      createdAt: new Date(),
    }

    onTaskAdd(newTask)
    setIsOpen(false)
  }

  return (
    <BackDrop >
      <TaskFormModal>
        <Form onSubmit={handleFormSubmit}>
          <label htmlFor="title">Title</label>
          <input name="title" id="title" />
          <label htmlFor="description">Description</label>
          <input name="description" />
          <label htmlFor="status">Status</label>
          <select name="status" id="status">
            <option value="ToDo">To Do</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <label htmlFor="priority">Priority</label>
          <select name="priority" id="priority">
            <option value='1'>High</option>
            <option value='2'>Regular</option>
            <option value='3'>Low</option>
          </select>
          <button>Add Task</button>
        </Form>
        <CloseModalBtn onClick={() => setIsOpen(false)}>X</CloseModalBtn>
      </TaskFormModal>
    </BackDrop>

  )
}

export default TaskForm
