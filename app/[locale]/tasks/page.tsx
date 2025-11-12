'use client'

import TaskService from '@/services/TaskService';
import { Task } from '@/types/Types';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import useInterval from 'use-interval';
import TasksOverviewTable from '../_components/tasks/TasksOverviewTable';
import TaskFormModal from '../_components/tasks/TaskFormModal';

export default function Tasks() {
  const t = useTranslations();
  const [tasks, setTasks] = useState<Array<Task>>();
  const [error, setError] = useState<string>();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const getTasks = async () => {
    setError('');
    // TODO: set selected task to null?
    const response = await TaskService.getAllTasks();

    if (!response.ok) {
      if (response.status === 401) {
        setError(
          'You are not authorized to view this page. Please login first.'
        );
      } else {
        setError(response.statusText);
      }
    } else {
      const tasks = await response.json();
      setTasks(tasks);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  useInterval(() => {
    if (!error) getTasks();
  }, 4000);

  // To show tasks
  let taskBlock;
  if (error) {
    // State 1: Error
    taskBlock = <div className="text-red-800">{error}</div>;
  } else if (!tasks) {
    // State 2: Empty
    taskBlock = <div>No tasks have been found.</div>;
  } else if (tasks && tasks.length > 0) {
    // State 3: Tasks are available
    taskBlock = <TasksOverviewTable tasks={tasks} selectTask={setSelectedTask}/>;
  }

  // // To show selected task in detail (TODO)
  // let selectedTaskBlock;
  // if (!selectedTask) {
  //   // State 1: Empty
  //   selectedTaskBlock = null;
  // } else if (selectedTask) {
  //   // State 2: Selected task is available
  //   selectedTaskBlock = <TaskInDetail task={selectedTask}/>;
  // }

  // To show form on click form
  let formRender;
  if (!isFormOpen) {
    // State 1: Empty
    formRender = null;
  } else if (isFormOpen) {
    // State 2: Form is shown
    formRender = <TaskFormModal onClose={closeForm}/>;
  }

  return (
    <>
      <main className="p-6 min-h-screen flex flex-col items-center">
        <h1 className="text-3xl my-3">{t('taskspage.title')}</h1>
        <section>
          {taskBlock}
        </section>
        {/* <section>
          {selectedTaskBlock}
        </section> */}
      </main>
      {formRender}

      <button
        // Positioning and Styling
        className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 z-50"
        onClick={openForm}
    >
        <span className="flex items-center justify-center w-6 h-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </span>
    </button>
    </>
  );
};