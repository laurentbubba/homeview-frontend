import TaskService from '@/services/TaskService';
import { Task, TaskInput } from '@/types/Types';
import React, { useState } from 'react';
import { mutate } from 'swr';
import ModalBase from '../Common/Modal/ModalBase';
import FormButtons from '../Common/Modal/FormButtons';
import { useCategories } from '@/app/hooks/useCategories';
import { getErrorMessage } from '@/lib/functions';

interface TaskFormModalProps {
    onClose: () => void; 
    previouslySelectedCategory?: string;
}

// You will pass the close function from the parent
function TaskFormModal({ onClose, previouslySelectedCategory }: TaskFormModalProps) {
    const [name, setName] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);    
    const [errors, setErrors] = useState<string[]>([]);
    const [status, setStatus] = useState<string>('');
    const [priority, setPriority] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>(
        previouslySelectedCategory === 'ALL' ? '' : (previouslySelectedCategory || '')
    );

    const { data: categoriesData,isLoading: categoriesIsLoading, error: categoriesError } = useCategories();
    
    const validate = () => {
        let result = true;
        setErrors([]);

        if (!name) {
            setErrors((errors) => [...errors, 'Task Name is required.']);
            result = false;
        }
        if (!selectedCategory) {
            setErrors((errors) => [...errors, 'Category is required.']);
            result = false;
        }
        if (!priority) {
            setErrors((errors) => [...errors, 'Priority is required.']);
            result = false;
        }

        return result;
    };

    const handleClickCreateTask = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setStatus('');

        if (!validate()) {
            return;
        }

        const task: TaskInput = {
            name,
            description,
            categoryName: selectedCategory,
            priority,
        };

        try {
            const responseJson = await TaskService.createTask(task);

            setStatus('Task created successfully.');
            mutate(['tasksByCategory', selectedCategory]);
        } catch (error: unknown) {
            setErrors((errors) => [...errors, getErrorMessage(error)]);
        }
    };

    return (
        <ModalBase onClose={onClose} title="Create New Task">
            <form onSubmit={handleClickCreateTask}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                    <input onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="name" type="text" placeholder="Task Name" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
                    <textarea onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="description" placeholder="Task Description"></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</label>
                    <select 
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        disabled={categoriesIsLoading}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {(!selectedCategory || categoriesIsLoading) && (
                            <option value="" disabled>
                                {categoriesIsLoading ? "Fetching categories..." : "Select a Category..."}
                            </option>
                        )}

                        {categoriesData?.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">Priority</label>
                    <select 
                        name="priority" 
                        id="priority"
                        value={priority || ""}
                        onChange={(e) => {
                            const val = e.target.value;
                            setPriority(val ? parseInt(val) : null);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                        <option value="">Select Priority...</option>
                        <option value="5">Critical</option>
                        <option value="4">High</option>
                        <option value="3">Medium</option>
                        <option value="2">Low</option>
                        <option value="1">Optional</option>
                    </select>
                </div>


                <p className='text-red-600'>{errors}</p>
                
                <FormButtons onClose={onClose} submitText='Create Task' />
            </form>
        </ModalBase>
    );
}

export default TaskFormModal;