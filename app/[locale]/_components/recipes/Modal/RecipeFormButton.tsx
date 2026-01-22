// import { User } from '@types';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface TaskFormButtonProps {
  onClick: () => void;
}

const TaskFormButton: React.FC<TaskFormButtonProps> = ({onClick}) => {
  const t = useTranslations();

  return (
    <button
        // Positioning and Styling
        className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 z-50"
        onClick={onClick}
    >
        <span className="flex items-center justify-center w-6 h-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </span>
    </button>
  );
};

export default TaskFormButton;