import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import GenericModal from './GenericModal';
import { Student } from '../../types';
import { useStudent } from '../../contexts/StudentContext';

interface EditStudentModalProps {
  student: Student;
  studentId: number;
  classroomId: number;
}

const EditStudentModal: React.FC<EditStudentModalProps> = ({
  student,
  studentId,
  classroomId,
}) => {
  const { editarStudent, removerStudent } = useStudent();
  const [name, setNome] = useState<string>(student.name);
  const [imageUrl, setImageUrl] = useState<string>(student.image_url);
  const [openEditStudentModal, setOpenEditStudentModal] = useState(false);
  const [frequency, setFrequencia] = useState<number>(student.frequency ?? 0);

  const handleOpenEditStudentModal = () => setOpenEditStudentModal(true);
  const handleCloseEditStudentModal = () => {
    setOpenEditStudentModal(false);
    resetForm();
  };

  const resetForm = () => {
    setNome(student.name);
    setImageUrl(student.image_url);
    setFrequencia(student.frequency ?? 0);
  };

  const handleSubmitEditStudent = async () => {
    await editarStudent(studentId, {
      id: studentId,
      name,
      image_url: imageUrl,
      frequency,
    });
    handleCloseEditStudentModal();
  };

  const handleRemoveStudent = async () => {
    try {
      await removerStudent(studentId, classroomId);
      handleCloseEditStudentModal();
    } catch (error) {
      alert('Erro ao remover aluno:');
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpenEditStudentModal}>
        Editar Aluno
      </Button>

      <GenericModal
        open={openEditStudentModal}
        onClose={handleCloseEditStudentModal}
        onSubmit={handleSubmitEditStudent}
        title="Editar Aluno"
        submitText="Salvar"
      >
        <TextField
          label="Nome do Aluno"
          fullWidth
          value={name}
          onChange={(e) => setNome(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="URL da Foto"
          fullWidth
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Frequência (%)"
          type="number"
          value={frequency}
          onChange={(e) => setFrequencia(Number(e.target.value))}
          margin="normal"
        />
        <Button
          variant="contained"
          color="error"
          onClick={handleRemoveStudent}
          sx={{ mt: 2 }}
        >
          Remover Aluno
        </Button>
      </GenericModal>
    </>
  );
};

export default EditStudentModal;
