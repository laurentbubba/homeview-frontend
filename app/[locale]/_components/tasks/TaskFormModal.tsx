import TaskService from '@/services/TaskService';
import { Task, TaskInput } from '@/types/Types';
import React, { useState } from 'react';

interface TaskFormModalProps {
    onClose: () => void; 
}

// You will pass the close function from the parent
function TaskFormModal({ onClose }: TaskFormModalProps) {
    const [name, setName] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);    
    const [errors, setErrors] = useState<string[]>([]);
    const [status, setStatus] = useState<string>('');
    
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
        };

        const response = await TaskService.createTask(task);
        const data = await response.json();

        if (!response.ok) {
            setErrors((errors) => [...errors, data.message]);
        } else {
            setStatus('Task created successfully.');
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]" 
            onClick={onClose} // Close modal when clicking outside
        >
            <div 
                className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100"
                onClick={(e) => e.stopPropagation()} // Stop click from bubbling up to the backdrop
            >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Create New Task</h3>
                
                <form onSubmit={handleClickCreateTask}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                        <input onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="name" type="text" placeholder="Task Name" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="description" placeholder="Task Description"></textarea>
                    </div>

                    {errors}
                    
                    {/* Submit and Close Buttons */}
                    <div className="flex items-center justify-between">
                        <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150" 
                            type="submit"
                        >
                            Submit Task
                        </button>
                        <button 
                            className="text-gray-500 hover:text-gray-800 font-bold py-2 px-4 rounded" 
                            type="button" 
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskFormModal;