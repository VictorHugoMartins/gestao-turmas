import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import GenericModal from './GenericModal';
import { Subject } from '../../types';
import axios from 'axios';

export interface StudentView {
  subjectId: number;
  grade: number;
  frequency: number;
}

export interface NewStudent {
  id: string;
  image_url: string;
  name: string;
  studentViews: StudentView[];
  frequency: number;
}

const NewStudentModal: React.FC = () => {
  const [novoStudent, setNovoStudent] = useState<NewStudent>({
    id: '',
    image_url: '',
    name: '',
    studentViews: [],
    frequency: 0,
  });
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [openStudentModal, setOpenStudentModal] = useState(false);

  const buscarSubjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/subjects/ListarSubjects`,
      );
      if (Array.isArray(response.data?.data)) {
        setSubjects(response.data.data);
      } else if (response.data.message) {
        alert(response.data.message);
        setSubjects([]);
      }
    } catch (error) {
      alert('Erro ao buscar turmas');
      setSubjects([]);
    }
  };

  const criarStudent = async (student: NewStudent) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/students`,
        student,
      );
      if (response.data && response.data.data) {
      }
      if (response.data.message) {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Erro ao criar aluno!');
    }
  };

  useEffect(() => {
    buscarSubjects();
  }, []);

  useEffect(() => {
    if (subjects.length > 0 && novoStudent.studentViews.length === 0) {
      const initialGrades: any = subjects.map((subject) => ({
        subjectId: subject.id,
        grade: 0,
        frequency: 0,
      }));
      setNovoStudent((prev) => ({ ...prev, studentViews: initialGrades }));
    }
  }, [subjects, novoStudent.studentViews.length]); // Adicionada dependência 'novoStudent.studentViews.length'

  const handleOpenStudentModal = () => setOpenStudentModal(true);
  const handleCloseStudentModal = () => {
    setOpenStudentModal(false);
    setNovoStudent({
      id: '',
      image_url: '',
      name: '',
      studentViews: [],
      frequency: 0,
    });
  };

  const handleSubmitNovoStudent = async () => {
    await criarStudent(novoStudent);
    handleCloseStudentModal();
  };

  const handleGradeChange = (subjectId: number, grade: number) => {
    setNovoStudent((prev) => ({
      ...prev,
      studentViews: prev.studentViews.map((input) =>
        input.subjectId === subjectId ? { ...input, grade } : input,
      ),
    }));
  };

  const handleFrequencyChange = (frequency: number) => {
    setNovoStudent((prev) => ({
      ...prev,
      frequency,
    }));
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpenStudentModal}>
        Adicionar Aluno
      </Button>

      <GenericModal
        open={openStudentModal}
        onClose={handleCloseStudentModal}
        onSubmit={handleSubmitNovoStudent}
        title="Adicionar Aluno"
        submitText="Adicionar Aluno"
        maxWidth="md"
      >
        <TextField
          label="Nome do Aluno"
          fullWidth
          value={novoStudent.name}
          onChange={(e) =>
            setNovoStudent({ ...novoStudent, name: e.target.value })
          }
          sx={{ mb: 2 }}
        />
        <TextField
          label="URL da Imagem"
          fullWidth
          value={novoStudent.image_url}
          onChange={(e) =>
            setNovoStudent({ ...novoStudent, image_url: e.target.value })
          }
          sx={{ mb: 2 }}
        />
        <TextField
          label="Frequência"
          type="number"
          value={novoStudent.frequency}
          onChange={(e) => handleFrequencyChange(Number(e.target.value))}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Grid container spacing={2}>
          {subjects.map(
            (subject, key) =>
              key > 0 && (
                <Grid item xs={4} key={subject.id}>
                  <TextField
                    label={`Nota da Turma ${subject.name}`}
                    type="number"
                    value={
                      novoStudent.studentViews.find(
                        (input) => input.subjectId === subject.id,
                      )?.grade || 0
                    }
                    onChange={(e) =>
                      handleGradeChange(
                        subject.id ?? -1,
                        Number(e.target.value),
                      )
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </Grid>
              ),
          )}
        </Grid>
      </GenericModal>
    </>
  );
};

export default NewStudentModal;
