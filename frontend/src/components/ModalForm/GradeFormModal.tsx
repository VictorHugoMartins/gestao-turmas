import React, { useState } from 'react';
import { StudentView } from '../../types';
import { TextField, Button, Modal, Box, Typography } from '@mui/material';
import { useStudent } from '../../contexts/StudentContext';

interface NotaFormProps {
  grade: StudentView;
  classroomId: number;
  id: number;
  studentId: number;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const GradeForm: React.FC<NotaFormProps> = ({ grade, classroomId, id }) => {
  const { editarStudentGrade } = useStudent();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [notaValue, setNotaValue] = useState<number>(grade.grade);

  const openEditModal = () => {
    setNotaValue(grade.grade);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setNotaValue(grade.grade);
  };

  const handleSubmit = async () => {
    await editarStudentGrade(grade, classroomId, notaValue);
    closeModal();
  };

  return (
    <>
      {/* Botão para abrir o modal de edição */}
      <Button
        variant="contained"
        color="warning"
        onClick={openEditModal}
        sx={{ mr: 1 }}
      >
        Editar Notas
      </Button>

      {/* Modal para editar notas */}
      <Modal open={showModal} onClose={closeModal}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Editar Notas
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nota"
              type="number"
              value={notaValue}
              onChange={(e) => setNotaValue(Number(e.target.value))}
              margin="normal"
              inputProps={{ min: 0, max: 10 }} // Limita o valor entre 0 e 10
            />
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
            >
              <Button variant="outlined" color="error" onClick={closeModal}>
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default GradeForm;
