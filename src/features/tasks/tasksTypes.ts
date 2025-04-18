export interface Task {
  title: string
  description: string
  status: "ToDo" | "InProgress" | "Done"
  createdAt: Date
  priority: "high" | "regular" | "low"
}
