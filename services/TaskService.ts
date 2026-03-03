import { apiClient } from "@/lib/api";
import { Task, TaskInput } from "@/types/Types";

const TaskService = {
  getAllTasks: () => 
    apiClient<Task[]>('/tasks'),

  getUnfinishedTasksByCategory: (categoryName: string) => 
    apiClient<Task[]>(`/tasks/byCategory/${categoryName}`),

  createTask: (task: TaskInput) => 
    apiClient<Task>('/tasks/create', {
      method: 'POST',
      body: JSON.stringify(task),
    }),

  finishTask: (taskId: number) => 
    apiClient<void>(`/tasks/finish/${taskId}`, {
      method: 'PUT',
    }),
};

export default TaskService;