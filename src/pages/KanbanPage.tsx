import Column from "../components/Column"
import styled from "styled-components"

const Section = styled.section`
  width: 1200px;
  margin: 0 auto;
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`

const KanbanPage = () => {
  return (
    <Section>
      <Wrapper>
        <Column status="Done" />
        <Column status="ToDo" />
        <Column status="InProgress" />
      </Wrapper>
    </Section>
  )
}

export default KanbanPage
