// import { User } from '@types';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import TaskFormModal from './TaskFormModal';
import TaskFormButton from './TaskFormButton';

interface TaskFormModalMechanicProps {
  openForm: () => void;
  closeForm: () => void;
  isFormOpen: boolean;
}

const TaskFormModalPlusButton: React.FC<TaskFormModalMechanicProps> = ({openForm, closeForm, isFormOpen}) => {
  let formRender;
  if (!isFormOpen) {
    // State 1: Empty
    formRender = null;
  } else if (isFormOpen) {
    // State 2: Form is shown
    formRender = <TaskFormModal onClose={closeForm}/>;
  }

  return (
    <>
      {formRender}
      <TaskFormButton onClick={openForm}></TaskFormButton>
    </>
  );
};

export default TaskFormModalPlusButton;