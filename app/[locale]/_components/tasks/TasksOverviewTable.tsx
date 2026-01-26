import React, { useState } from "react";
import { Task } from "@types";
import TaskService from "@/services/TaskService";
import { mutate } from "swr";

type Props = {
    tasks: Array<Task>;
    selectTask: (task: Task) => void;
    selectedCategory: string;
};

const TasksOverviewTable: React.FC<Props> = ({tasks, selectTask, selectedCategory}: Props) => {
    const [errors, setErrors] = useState<string[]>([]);
    const [status, setStatus] = useState<string>('');

    const HandleFinishTask = async (taskId: number) => {
        const response = await TaskService.finishTask(taskId);
        const data = await response.json();

        if (!response.ok) {
            setErrors((errors) => [...errors, data.message]);
        } else {
            setStatus('Task finished successfully.');
            mutate(['tasksByCategory', selectedCategory]);
        }
    };

    return (
        <>
            {tasks && (
                <table className="w-full table-fixed">
                    <thead className="hidden md:table-header-group">
                        <tr>
                            <th className="w-[30%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Taskname</th>
                            <th className="w-[50%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Description</th>
                            <th className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr className="flex justify-between items-center md:table-row md:border-none border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 odd:bg-white even:bg-gray-50 transition duration-150"
                                key={index}
                                onClick={() => selectTask(task)}
                                role="button">
                                    <td className="font-bold text-center md:text-left px-6 py-3 text-sm text-gray-700">{task.name}</td>
                                    <td className="hidden md:block text-center sm:text-left px-6 py-3 text-sm text-gray-700">{task.description}</td>
                                    <td className="text-center md:text-left px-6 py-3 text-sm text-gray-700">
                                        <div className="flex justify-content items-center ">
                                        {task.isFinished ? (
                                            <span className="text-center font-medium text-gray-400">Done</span>
                                        ) : (
                                            <>
                                                <span className="font-medium text-orange-600">To Do</span>
                                                <button                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                                                    className="p-2 text-gray-400 hover:text-red-500 transition duration-150 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                    onClick={() => HandleFinishTask(task.id)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </button>
                                            </>
                                        )}
                                        </div>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default TasksOverviewTable;