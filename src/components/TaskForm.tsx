import React from "react";
import styled from "styled-components"

interface TaskFormProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
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
const TaskForm = ({ isOpen, setIsOpen }: TaskFormProps) => {

  return (
    <BackDrop onClick={() => setIsOpen(false)}>
      <TaskFormModal>
        <Form>
          <label htmlFor="title">Title</label>
          <input name="title" id="title" />
          <label htmlFor="description">Description</label>
          <input name="description" />
          <button>Add Task</button>
        </Form>
      </TaskFormModal>
    </BackDrop>

  )
}

export default TaskForm
