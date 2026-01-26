import TaskService from '@/services/TaskService';
import { Task, TaskInput } from '@/types/Types';
import React, { useState } from 'react';
import { mutate } from 'swr';

interface ModalBaseProps {
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

// You will pass the close function from the parent
function ModalBase({ onClose, title, children }: ModalBaseProps) {

    return (
        <div 
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]" 
            onClick={onClose}
        >
            <div 
                className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100"
                onClick={(e) => e.stopPropagation()} // Stop click from bubbling up to the backdrop
            >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">{title}</h3>
                
                {children}
            </div>
        </div>
    );
}

export default ModalBase;