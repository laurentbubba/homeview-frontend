import React from "react";
import { Task } from "@types";

type Props = {
    tasks: Array<Task>;
    selectTask: (task: Task) => void;
};

const TasksOverviewTable: React.FC<Props> = ({tasks, selectTask}: Props) => {

    return (
        <>
            {tasks && (
                <table>
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Taskname</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100" scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr className="text-left border border-gray-200 hover:bg-gray-100 odd:bg-white even:bg-gray-50 transition duration-150"
                                key={index}
                                onClick={() => selectTask(task)}
                                role="button">
                                <td className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">{task.name}</td>
                                <td className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">{task.description}</td>
                                <td className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">
                                    {task.isFinished ? 'Finished' : 'Ongoing'}
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