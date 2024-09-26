import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import GenericModal from './GenericModal';
import { useClassroom } from '../../contexts/ClassroomContext';

const NewClassModal: React.FC = () => {
  const { criarClassroom } = useClassroom();
  const [novaClassroom, setNovaClassroom] = useState<{
    id: number;
    name: string;
  }>({ id: 0, name: '' });
  const [openClassroomModal, setOpenClassroomModal] = useState(false);

  const handleOpenClassroomModal = () => setOpenClassroomModal(true);
  const handleCloseClassroomModal = () => {
    setOpenClassroomModal(false);
    setNovaClassroom({ id: 0, name: '' });
  };

  const handleSubmitNovaClassroom = async () => {
    await criarClassroom(novaClassroom.name);
    handleCloseClassroomModal();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpenClassroomModal}>
        Criar Nova Turma
      </Button>

      <GenericModal
        open={openClassroomModal}
        onClose={handleCloseClassroomModal}
        onSubmit={handleSubmitNovaClassroom}
        title="Criar Nova Turma"
        submitText="Adicionar Turma"
      >
        <TextField
          label="Nome da Turma"
          fullWidth
          value={novaClassroom.name}
          onChange={(e) =>
            setNovaClassroom({ ...novaClassroom, name: e.target.value })
          }
          sx={{ mb: 2 }}
        />
      </GenericModal>
    </>
  );
};

export default NewClassModal;
