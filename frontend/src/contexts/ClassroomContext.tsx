import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Classroom } from '../types';

interface ClassroomContextProps {
  classrooms: Classroom[];
  criarClassroom: (name: string) => Promise<void>;
  editarClassroom: (id: number, name: string) => Promise<void>;
  removerClassroom: (id: number) => Promise<void>;
  buscarClassrooms: () => Promise<void>;
}

const ClassroomContext = createContext<ClassroomContextProps | undefined>(
  undefined,
);

export const useClassroom = () => {
  const context = useContext(ClassroomContext);
  if (!context) {
    throw new Error('useClassroom must be used within a ClassroomProvider');
  }
  return context;
};

export const ClassroomProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);

  const buscarClassrooms = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/classrooms/ListarClassrooms`,
      );
      if (Array.isArray(response.data?.data)) {
        setClassrooms(response.data.data);
      } else {
        alert('Formato de resposta inesperado ao buscar turmas:');
        setClassrooms([]);
      }
    } catch (error) {
      alert('Erro ao buscar turmas:');
      setClassrooms([]);
    }
  };

  const criarClassroom = async (name: string) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/classrooms`,
        { name },
      );
      if (response?.data) {
        alert('Turma criada com sucesso!');
      }
    } catch (error) {
      alert('Erro ao criar turma:');
    }
  };

  const editarClassroom = async (id: number, name: string) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/classrooms/${id}`,
        { name },
      );
      if (response) {
        setClassrooms((prev) =>
          prev.map((classroom) =>
            classroom.id === id ? response.data : classroom,
          ),
        );
        alert('Turma atualizada com sucesso!');
      }
    } catch (error) {
      alert('Erro ao editar turma:');
    }
  };

  const removerClassroom = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/classrooms/${id}`);
      setClassrooms((prev) => prev.filter((classroom) => classroom.id !== id));
      alert('Turma removida com sucesso!');
      buscarClassrooms();
    } catch (error) {
      alert('Erro ao remover turma:');
    }
  };

  useEffect(() => {
    buscarClassrooms();
  }, []);

  return (
    <ClassroomContext.Provider
      value={{
        classrooms,
        criarClassroom,
        editarClassroom,
        removerClassroom,
        buscarClassrooms,
      }}
    >
      {children}
    </ClassroomContext.Provider>
  );
};
