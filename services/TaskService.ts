// const getToken = (): string => {
//   const loggedInUserString = sessionStorage.getItem('loggedInUser');
//   return loggedInUserString ? JSON.parse(loggedInUserString).token : '';
// };

import { Task, TaskInput } from "@/types/Types";

const getAllTasks = () => {
  return fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/tasks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    //   Authorization: `Bearer ${getToken()}`,
    },
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

const TaskService = {
  getAllTasks,
  createTask,
};

export default TaskService;