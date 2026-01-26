import React from 'react';

interface FormButtonsProps {
    onClose: () => void; 
}

// You will pass the close function from the parent
function FormButtons({ onClose }: FormButtonsProps) {
    return (
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
    );
}

export default FormButtons;