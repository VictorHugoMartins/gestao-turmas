import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { Student, StudentView } from '../types';

interface StudentContextProps {
  students: Student[];
  buscarStudents: (classroomId: number) => void;
  editarStudent: (id: number, student: Student) => void;
  editarStudentGrade: (
    grade: StudentView,
    classroomId: number,
    notaValue: number,
  ) => void;
  removerStudent: (id: number, classroomId: number) => void;
}

const StudentContext = createContext<StudentContextProps | undefined>(
  undefined,
);

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within an StudentProvider');
  }
  return context;
};

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [students, setStudents] = useState<Student[]>([]);

  const buscarStudents = async (classroomId: number) => {
    try {
      let response;
      if (classroomId === -1) {
        response = await axios.get(
          `http://localhost:5000/api/students/ListarMediaStudentViewsFrequency`,
        );
      } else {
        response = await axios.get(
          `http://localhost:5000/api/classrooms/${classroomId}/ListarStudents`,
        );
      }

      if (response.data && response.data.data) {
        setStudents(response.data.data);
      } else {
        alert('Formato de resposta inesperado ao buscar alunos');
      }
    } catch (error) {
      alert('Erro ao buscar alunos');
    }
  };

  const editarStudent = async (id: number, student: Student) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/students/${id}`,
        student,
      );
      if (response.data && response.data.data) {
        setStudents((prev) =>
          prev.map((a) => (a.id === student.id ? response.data.data : a)),
        );
        await buscarStudents(-1);
      } else {
        alert('Formato de resposta inesperado ao editar aluno');
      }
    } catch (error) {
      alert('Erro ao editar aluno');
    }
  };

  const editarStudentGrade = async (
    grade: StudentView,
    classroomId: number,
    notaValue: number,
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/grades/${grade.classroomId}/students/${grade.studentId}`,
        {
          classroomId,
          studentId: grade.studentId,
          grade: notaValue,
        },
      );
      if (response) {
        alert('Turma atualizada com sucesso!');
      }
    } catch (error) {
      alert('Erro ao atualizar notas.');
    }
  };

  const removerStudent = async (id: number, classroomId: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/students/${id}`,
      );
      if (response.data && response.data.data) {
        await buscarStudents(classroomId);
      } else {
        alert('Formato de resposta inesperado ao remover aluno');
      }
    } catch (error) {
      alert('Erro ao remover aluno');
    }
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        buscarStudents,
        editarStudent,
        editarStudentGrade,
        removerStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
