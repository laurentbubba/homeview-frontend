import React, { useState } from "react";
import { Task } from "@types";
import TaskService from "@/services/TaskService";
import { mutate } from "swr";
import { getErrorMessage } from "@/lib/functions";
import { useIsMobile } from "@/app/hooks/useIsMobile";

type Props = {
    tasks: Array<Task>;
    selectTask: (task: Task) => void;
    selectedCategory: string;
};

const TasksOverviewTable: React.FC<Props> = ({tasks, selectTask, selectedCategory}: Props) => {
    const [errors, setErrors] = useState<string[]>([]);
    const [status, setStatus] = useState<string>('');

    const isMobile = useIsMobile();
    
    const handleFinishTask = async (taskId: number) => {
        try {
            const responseJson = await TaskService.finishTask(taskId);

            setStatus('Task finished successfully.');
            mutate(['tasksByCategory', selectedCategory]);
        } catch (error: unknown) {
            setErrors((errors) => [...errors, getErrorMessage(error)]);
        }
    };

    const handleUpdatePriority = async (taskId: number, priority: number) => {
        try {
            const responseJson = await TaskService.updateTaskPriority(taskId, priority);

            setStatus('Task priority updated successfully.');
            mutate(['tasksByCategory', selectedCategory]);
        } catch (error: unknown) {
            setErrors((errors) => [...errors, getErrorMessage(error)]);
        }
    };

    const turnPrioToBGColor = (priority: number) => {
        switch(priority) {
            case 1: return "bg-white-100";
            case 2: return "bg-yellow-50";
            case 3: return "bg-amber-100";
            case 4: return "bg-orange-200";
            case 5: return "bg-red-200";
            default: return "bg-white-100";
        }   
    }

    const turnPrioToTextColor = (priority: number) => {
        switch(priority) {
            case 1: return "text-slate-400";
            case 2: return "text-yellow-300";
            case 3: return "text-amber-400";
            case 4: return "text-orange-500";
            case 5: return "text-red-600";
            default: return "text-slate-500";
        }   
    }

    const turnPrioToBorderColor = (priority: number) => {
        switch(priority) {
            case 1: return "border border-slate-300";
            case 2: return "border yellow-300";
            case 3: return "border amber-300";
            case 4: return "border orange-300";
            case 5: return "border red-300";
            default: return "border slate-300";
        }   
    }

    const priorityMap = {
        5: "Critical",
        4: "High",
        3: "Medium",
        2: "Low",
        1: "Optional",
    };

    if (isMobile){
        return (
            <>
                {tasks && (
                    <table className="">
                        <thead className="">
                            <tr>
                                <th className="pl-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Taskname</th>
                                <th className="pl-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Priority</th>                            
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr className="border-none border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 odd:bg-white even:bg-gray-50 transition duration-150"
                                    key={index}
                                    onClick={() => selectTask(task)}
                                    role="button">
                                        <td className={`font-bold text-left pl-6 py-3 text-sm text-gray-700 ${turnPrioToBGColor(task.priority)}`}>
                                            {task.name}
                                        </td>
                                        <td className="text-center px-6 py-3 text-sm text-gray-700">
                                        <select
                                            value={task.priority}
                                            onChange={(e) => handleUpdatePriority(task.id, parseInt(e.target.value))}
                                            className={`bg-transparent focus:ring-0 cursor-pointer text-sm ${turnPrioToTextColor(task.priority)} ${turnPrioToBorderColor(task.priority)}`}
                                        >
                                            {Object.entries(priorityMap).map(([value, label]) => (
                                                <option key={value} value={value} className={`${turnPrioToTextColor(Number(value))}`}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>                                  
                                        <td className="text-center px-6 py-3 text-sm text-gray-700">
                                            <div className="flex justify-content items-center ">
                                                {task.isFinished ? (
                                                    <span className="text-center font-medium text-gray-400">Done</span>
                                                ) : (
                                                    <>
                                                        <span className="font-medium text-orange-600">To Do</span>
                                                        <button                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                                                            className="p-2 text-gray-400 hover:text-red-500 transition duration-150 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                            onClick={() => handleFinishTask(task.id)}
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
    }

    else if (!isMobile) {
        return (
            <>
                {tasks && (
                    <table className="">
                        <thead className="">
                            <tr>
                                <th className="pl-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Taskname</th>
                                <th className="pl-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Description</th>
                                <th className="pl-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Priority</th>                            
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr className="border-none border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 odd:bg-white even:bg-gray-50 transition duration-150"
                                    key={index}
                                    onClick={() => selectTask(task)}
                                    role="button">
                                        <td className={`font-bold text-left pl-6 py-3 text-sm text-gray-700 ${turnPrioToBGColor(task.priority)}`}>
                                            {task.name}
                                        </td>
                                        <td className="text-left px-6 py-3 text-sm text-gray-700">{task.description}</td>
                                        <td className="text-center px-6 py-3 text-sm text-gray-700">
                                        <select
                                            value={task.priority}
                                            onChange={(e) => handleUpdatePriority(task.id, parseInt(e.target.value))}
                                            className={`bg-transparent focus:ring-0 cursor-pointer text-sm ${turnPrioToTextColor(task.priority)} ${turnPrioToBorderColor(task.priority)}`}
                                        >
                                            {Object.entries(priorityMap).map(([value, label]) => (
                                                <option key={value} value={value} className={`${turnPrioToTextColor(Number(value))}`}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>                                  
                                        <td className="text-center px-6 py-3 text-sm text-gray-700">
                                            <div className="flex justify-content items-center ">
                                                {task.isFinished ? (
                                                    <span className="text-center font-medium text-gray-400">Done</span>
                                                ) : (
                                                    <>
                                                        <span className="font-medium text-orange-600">To Do</span>
                                                        <button                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                                                            className="p-2 text-gray-400 hover:text-red-500 transition duration-150 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                            onClick={() => handleFinishTask(task.id)}
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
    }
};

export default TasksOverviewTable;