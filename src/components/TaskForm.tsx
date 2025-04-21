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
const TaskForm = ({ isOpen, setIsOpen }: TaskFormProps) => {

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const title = formData.get("title")
    const description = formData.get("description")
  }
  return (
    <BackDrop >
      <TaskFormModal onBlur={() => setIsOpen(false)}>
        <Form>
          <label htmlFor="title">Title</label>
          <input name="title" id="title" />
          <label htmlFor="description">Description</label>
          <input name="description" />
          <label htmlFor="status"></label>
          <select name="status" id="status">
            <option value="ToDo">To Do</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button >Add Task</button>
        </Form>
        <CloseModalBtn onClick={() => setIsOpen(false)}>X</CloseModalBtn>
      </TaskFormModal>
    </BackDrop>

  )
}

export default TaskForm
