import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { StudentView } from '../types';

interface StudentViewContextProps {
  notas: StudentView[];
  buscarNotas: (classroomId: number) => void;
}

const StudentViewContext = createContext<StudentViewContextProps | undefined>(
  undefined,
);

export const useStudentView = () => {
  const context = useContext(StudentViewContext);
  if (!context) {
    throw new Error(
      'useStudentView must be used within an StudentViewProvider',
    );
  }
  return context;
};

export const StudentViewProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notas, setNotas] = useState<StudentView[]>([]);

  const buscarNotas = async (classroomId: number) => {
    try {
      setNotas([]);
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
      setNotas(response.data.data || []);
    } catch (error) {
      alert('Erro ao buscar notas:');
    }
  };

  return (
    <StudentViewContext.Provider value={{ notas, buscarNotas }}>
      {children}
    </StudentViewContext.Provider>
  );
};
