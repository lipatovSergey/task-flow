import Column from "../components/Column"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  gap: 1rem
`

const KanbanPage = () => {
  return (
    <Wrapper>
      <Column status="Done" />
      <Column status="ToDo" />
      <Column status="InProgress" />
    </Wrapper>
  )
}

export default KanbanPage
