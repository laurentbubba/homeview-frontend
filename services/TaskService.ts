// const getToken = (): string => {
//   const loggedInUserString = sessionStorage.getItem('loggedInUser');
//   return loggedInUserString ? JSON.parse(loggedInUserString).token : '';
// };

import { Task, TaskInput } from "@/types/Types";

const getAllTasks = () => {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/tasks', {
    method: 'GET'
  });
};

const getUnfinishedTasksByCategory = (categoryName: string) => {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + `/tasks/byCategory/${categoryName}`, {
    method: 'GET'
  });
};

const createTask = (task: TaskInput) => {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/tasks/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    //   Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(task)
  });
};

const finishTask = (taskId: number) => {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + `/tasks/finish/${taskId}`, {
    method: 'PUT'
  });
};

const TaskService = {
  getAllTasks,
  createTask,
  finishTask,
  getUnfinishedTasksByCategory,
};

export default TaskService;