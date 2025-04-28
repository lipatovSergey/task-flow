import styled from "styled-components";

export const BackDrop = styled.div`
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
`;

export const TaskFormModal = styled.div`
  position: relative;
  padding: 16px;
  background-color: #1d3074;
  border-radius: 8px;
  max-width: 500px;
  min-height: 250px;
  width: 90%;
  z-index: 1000;
`;

export const Form = styled.form`
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
`;

export const CloseModalBtn = styled.button`
  position: absolute;
  right: -10px;
  top: -10px;
`;

export const ErrorSpan = styled.span`
  color: #e60000;
  font-size: 12px;
`;
