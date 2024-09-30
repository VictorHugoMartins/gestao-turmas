import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Subject } from '../types';

interface SubjectContextProps {
  subjects: Subject[];
  criarSubject: (name: string) => Promise<void>;
  editarSubject: (id: number, name: string) => Promise<void>;
  removerSubject: (id: number) => Promise<void>;
  buscarSubjects: () => Promise<void>;
}

const SubjectContext = createContext<SubjectContextProps | undefined>(
  undefined,
);

export const useSubject = () => {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error('useSubject must be used within a SubjectProvider');
  }
  return context;
};

export const SubjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const buscarSubjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/subjects/ListarSubjects`,
      );
      if (Array.isArray(response.data?.data)) {
        setSubjects(response.data.data);
      } else if (response.data.message) {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Erro ao buscar turmas:');
      setSubjects([]);
    }
  };

  const criarSubject = async (name: string) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/subjects`,
        { name },
      );
      if (response?.data) {
        alert('Turma criada com sucesso! Por favor, Atualize a página!');
      }
    } catch (error) {
      alert('Erro ao criar turma:');
    }
  };

  const editarSubject = async (id: number, name: string) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/subjects/${id}`,
        { name },
      );
      if (response) {
        setSubjects((prev) =>
          prev.map((subject) =>
            subject.id === id ? response.data : subject,
          ),
        );
        alert('Turma atualizada com sucesso! Por favor, Atualize a página!');
      }
    } catch (error) {
      alert('Erro ao editar turma:');
    }
  };

  const removerSubject = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/subjects/${id}`);
      setSubjects((prev) => prev.filter((subject) => subject.id !== id));
      alert('Turma removida com sucesso! Por favor, Atualize a página!');
      buscarSubjects();
    } catch (error) {
      alert('Erro ao remover turma:');
    }
  };

  useEffect(() => {
    buscarSubjects();
  }, []);

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        criarSubject,
        editarSubject,
        removerSubject,
        buscarSubjects,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};
