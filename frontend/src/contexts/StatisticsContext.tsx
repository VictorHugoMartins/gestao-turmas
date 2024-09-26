import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

type CardsResumeValues = {
  mediaClassroomGrades: number;
  mediaPorClassroom: {
    classroomId: number;
    classroomName: string;
    mediaClassroomGrades: number;
  }[];
};

type StatisticsContextType = {
  values: CardsResumeValues;
  fetchStatistics: Function;
};

const StatisticsContext = createContext<StatisticsContextType | undefined>(undefined);

export const StatisticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [values, setValues] = useState<CardsResumeValues>({ mediaClassroomGrades: 0, mediaPorClassroom: [] });

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/grades/statistics`);

      if (response.data && response.data.data) {
        setValues(response.data.data);
      } else {
        alert('Formato de resposta inesperado ao buscar estatísticas');
      }
    } catch (error) {
      alert('Erro ao buscar estatísticas:');
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <StatisticsContext.Provider value={{ values, fetchStatistics }}>
      {children}
    </StatisticsContext.Provider>
  );
};

export const useStatistics = () => {
  const context = useContext(StatisticsContext);
  if (!context) {
    throw new Error('useStatistics must be used within a StatisticsProvider');
  }
  return context;
};
