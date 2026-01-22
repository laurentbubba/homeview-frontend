// import { User } from '@types';
import RecipeFormModal from './RecipeFormModal';
import RecipeFormButton from './RecipeFormButton';

interface RecipeFormModalMechanicProps {
  openForm: () => void;
  closeForm: () => void;
  isFormOpen: boolean;
}

const RecipeFormModalPlusButton: React.FC<RecipeFormModalMechanicProps> = ({openForm, closeForm, isFormOpen}) => {
  let formRender;
  if (!isFormOpen) {
    // State 1: Empty
    formRender = null;
  } else if (isFormOpen) {
    // State 2: Form is shown
    formRender = <RecipeFormModal onClose={closeForm}/>;
  }

  return (
    <>
      {formRender}
      <RecipeFormButton onClick={openForm}></RecipeFormButton>
    </>
  );
};

export default RecipeFormModalPlusButton;