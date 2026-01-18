'use client'

import { Category, Task } from '@/types/Types';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import useSWR from 'swr';
import CategoriesBlock from '../_components/categories/CategoriesBlock';
import CategoryService from '@/services/CategoryService';
import ContentPage from '../_components/ContentPage';
import TaskFormModalPlusButton from '../_components/tasks/Modal/TaskFormModalPlusButton';
import TaskService from '@/services/TaskService';
import TasksOverviewTable from '../_components/tasks/Table/TasksOverviewTable';

export default function TasksByCategory() {
  const t = useTranslations();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const [selectedCategory, setSelectedCategory] = useState<string>();
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  }

  const categoriesFetcher = async () => {
    const categories = await CategoryService.getAllCategories();
    return categories.json();
  };
  const { data: categoriesData, error: categoriesError, isLoading: categoriesIsLoading }
    = useSWR<Category[]>('Categories', categoriesFetcher);

  //useSWR will take the two arguments, so we gotta destructure
  const tasksByCategoryFetcher = async ([_, category]: [string, string]) => {
    if (!category) return [];
    const response = await TaskService.getUnfinishedTasksByCategory(category);
    return response.json(); 
  };
  // first argument is conditional based on selectedCategory
  const { data: tasksByCategory, error: errorTasksByCategory, isLoading: isLoadingTasksByCategory } = 
  useSWR<Task[]>(
    selectedCategory ? ['tasksByCategory', selectedCategory] : null, 
    tasksByCategoryFetcher
  );


  // To show tasks
  let taskBlock;
  if (!selectedCategory){
    // State 0: Initial/Idle State
    taskBlock = <div className="text-gray-500">Please select a category to view tasks.</div>;
  } else if (isLoadingTasksByCategory) {
    // State 1: Loading
    taskBlock = <div className="text-gray-500">Loading tasks ...</div>;
  } else if (errorTasksByCategory) {
    // State 2: Error
    taskBlock = <div className="text-red-800">{errorTasksByCategory}</div>;
  } else if (!tasksByCategory || tasksByCategory.length == 0) {
    // State 3: Empty
    taskBlock = <div>No tasks have been found.</div>;
  } else if (tasksByCategory && tasksByCategory.length > 0) {
    // State 3: Tasks are available
    taskBlock = <TasksOverviewTable tasks={tasksByCategory} selectTask={setSelectedTask}/>;
  }


  return (
    <ContentPage title={t('categorypage.title')}>
      <CategoriesBlock categoriesError={categoriesError}
      categoriesIsLoading={categoriesIsLoading} categoriesData={categoriesData} selectCategory={handleSelectCategory}></CategoriesBlock>
      <TaskFormModalPlusButton openForm={openForm} closeForm={closeForm} isFormOpen={isFormOpen}></TaskFormModalPlusButton>
      {!categoriesIsLoading && taskBlock}
    </ContentPage>
  );
};