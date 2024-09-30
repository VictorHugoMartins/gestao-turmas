import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import GenericModal from './GenericModal';
import { useSubject } from '../../contexts/SubjectContext';

const NewClassModal: React.FC = () => {
  const { criarSubject } = useSubject();
  const [novaSubject, setNovaSubject] = useState<{
    id: number;
    name: string;
  }>({ id: 0, name: '' });
  const [openSubjectModal, setOpenSubjectModal] = useState(false);

  const handleOpenSubjectModal = () => setOpenSubjectModal(true);
  const handleCloseSubjectModal = () => {
    setOpenSubjectModal(false);
    setNovaSubject({ id: 0, name: '' });
  };

  const handleSubmitNovaSubject = async () => {
    await criarSubject(novaSubject.name);
    handleCloseSubjectModal();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpenSubjectModal}>
        Criar Nova Turma
      </Button>

      <GenericModal
        open={openSubjectModal}
        onClose={handleCloseSubjectModal}
        onSubmit={handleSubmitNovaSubject}
        title="Criar Nova Turma"
        submitText="Adicionar Turma"
      >
        <TextField
          label="Nome da Turma"
          fullWidth
          value={novaSubject.name}
          onChange={(e) =>
            setNovaSubject({ ...novaSubject, name: e.target.value })
          }
          sx={{ mb: 2 }}
        />
      </GenericModal>
    </>
  );
};

export default NewClassModal;
