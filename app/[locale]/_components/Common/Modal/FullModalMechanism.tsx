// import { User } from '@types';
import { ReactNode } from 'react';
import FormButton from './ModalButton';

interface FullModalMechanismProps {
  openForm: () => void;
  closeForm: () => void;
  isFormOpen: boolean;
  renderForm: (onClose: () => void) => ReactNode;
}

const FullModalMechanism: React.FC<FullModalMechanismProps> = ({openForm, closeForm, isFormOpen, renderForm}) => {
  let formRender;
  if (!isFormOpen) {
    // State 1: Empty
    formRender = null;
  } else if (isFormOpen) {
    // State 2: Form is shown
    formRender = renderForm(closeForm);
  }

  return (
    <>
      {formRender}
      <FormButton onClick={openForm}></FormButton>
    </>
  );
};

export default FullModalMechanism;