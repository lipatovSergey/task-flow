import Column from "../components/Column"
import styled from "styled-components"
import { mockTasks } from "../features/tasks/mockData"
import { Task } from "../features/tasks/tasksTypes"
import { useState } from "react"

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
const statuses: Task["status"][] = ["ToDo", "InProgress", "Done"]

const KanbanPage = () => {
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false)

  return (
    <Section>
      <Wrapper>
        <button onClick={() => setIsAddTaskFormOpen(true)}>Add Task</button>
        {statuses.map(status => (
          <Column
            key={status}
            status={status}
            tasks={mockTasks.filter((task) => task.status === status)}
          />
        ))}
      </Wrapper>
    </Section>
  )
}

export default KanbanPage
