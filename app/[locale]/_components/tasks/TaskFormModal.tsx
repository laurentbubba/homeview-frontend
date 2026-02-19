import TaskService from '@/services/TaskService';
import { Task, TaskInput } from '@/types/Types';
import React, { useState } from 'react';
import { mutate } from 'swr';
import ModalBase from '../Common/Modal/ModalBase';
import FormButtons from '../Common/Modal/FormButtons';

interface TaskFormModalProps {
    onClose: () => void; 
}

// You will pass the close function from the parent
function TaskFormModal({ onClose }: TaskFormModalProps) {
    const [name, setName] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);    
    const [errors, setErrors] = useState<string[]>([]);
    const [status, setStatus] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    
    const validate = () => {
        let result = true;
        setErrors([]);

        if (!name) {
            setErrors((errors) => [...errors, 'Task Name is required.']);
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
        };

        const response = await TaskService.createTask(task);
        const data = await response.json();

        if (!response.ok) {
            setErrors((errors) => [...errors, data.message]);
        } else {
            setStatus('Task created successfully.');
            mutate(['tasksByCategory', selectedCategory]);
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
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        value={selectedCategory}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        id="category"
                    >
                        <option value="" disabled>Select a Category...</option>
                        <option value="Personal">Personal</option>
                        <option value="Study">Study</option>
                        <option value="House">House</option>
                        <option value="Homeview">Homeview App</option>
                        <option value="Other">Other</option>
                    </select>
                </div>


                <p className='text-red-600'>{errors}</p>
                
                <FormButtons onClose={onClose} submitText='Create Task' />
            </form>
        </ModalBase>
    );
}

export default TaskFormModal;