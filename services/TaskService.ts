import { apiClient } from "@/lib/api";
import { Task, TaskInput } from "@/types/Types";

const TaskService = {
  getAllTasks: () => 
    apiClient<Task[]>('/tasks'),

  getUnfinishedTasksByCategory: (categoryName: string) => 
    apiClient<Task[]>(`/tasks/byCategory/${categoryName}`),

  getAllUnfinishedTasksOnPriority: () => 
    apiClient<Task[]>('/tasks/onPriority'),

  createTask: (task: TaskInput) => 
    apiClient<Task>('/tasks/create', {
      method: 'POST',
      body: JSON.stringify(task),
    }),

  finishTask: (taskId: number) => 
    apiClient<void>(`/tasks/finish/${taskId}`, {
      method: 'PUT',
    }),

  updateTaskPriority: (taskId: number, priority: number) => 
    apiClient<void>(`/tasks/updatePriority/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify({ priority }),
    }),
};

export default TaskService;