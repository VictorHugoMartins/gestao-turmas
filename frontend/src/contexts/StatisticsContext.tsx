import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

type CardsResumeValues = {
  mediaSubjectGrades: number;
  mediaPorSubject: {
    subjectId: number;
    subjectName: string;
    mediaSubjectGrades: number;
  }[];
};

type StatisticsContextType = {
  values: CardsResumeValues;
  fetchStatistics: Function;
};

const StatisticsContext = createContext<StatisticsContextType | undefined>(
  undefined,
);

export const StatisticsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [values, setValues] = useState<CardsResumeValues>({
    mediaSubjectGrades: 0,
    mediaPorSubject: [],
  });

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/grades/statistics`,
      );

      if (response?.data && response?.data?.data) {
        setValues(response.data.data);
      } else if (response.data.message) {
        alert(response.data.message);
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
