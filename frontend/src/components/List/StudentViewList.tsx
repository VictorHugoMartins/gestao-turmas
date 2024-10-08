import React, { useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Box,
} from '@mui/material';
import { styled } from '@mui/system';
import GradeForm from '../ModalForm/GradeFormModal';
import { useStatistics } from '../../contexts/StatisticsContext';
import EditStudentModal from '../ModalForm/EditStudentModal';
import { StudentView } from '../../types';
import { useStudentView } from '../../contexts/StudentViewContext';

interface StudentViewListProps {
  subjectId: number;
  mediaGeral: number;
}

const StyledImage = styled('img')({
  width: 50,
  height: 50,
  borderRadius: '50%',
  objectFit: 'cover',
});

const StudentViewList: React.FC<StudentViewListProps> = ({ subjectId }) => {
  const { notas, buscarNotas } = useStudentView();
  const { values } = useStatistics();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [minGrade, setMinGrade] = useState<number | ''>('');
  const [minFrequency, setMinFrequency] = useState<number | ''>('');

  useEffect(() => {
    buscarNotas(subjectId);
  }, [subjectId]);

  // Lógica de Filtro
  const filteredGrades = notas.filter(
    (grade: StudentView) =>
      grade.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (minGrade === '' || grade.grade >= minGrade) && // Filtro de nota mínima
      (minFrequency === '' || grade.frequency >= minFrequency), // Filtro de frequência mínima
  );

  // Obtendo a média da turma correspondente ao subjectId
  const subjectAverage = values.mediaPorSubject.find(
    (item) => item.subjectId === subjectId,
  )?.mediaSubjectGrades;

  return (
    <>
      {/* Barra de pesquisa */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: 2 }}>
        <TextField
          label="Pesquisar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
        />
        <TextField
          label="Nota Mínima"
          type="number"
          value={minGrade}
          onChange={(e) =>
            setMinGrade(e.target.value ? parseFloat(e.target.value) : '')
          }
          variant="outlined"
        />
        <TextField
          label="Frequência Mínima (%)"
          type="number"
          value={minFrequency}
          onChange={(e) =>
            setMinFrequency(e.target.value ? parseFloat(e.target.value) : '')
          }
          variant="outlined"
        />
      </Box>

      {/* Tabela de notas */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Foto</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Nota</TableCell>
              <TableCell>Frequência (%)</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGrades.map((grade: StudentView) => {
              let betterThanSubjectAverage =
                subjectAverage && grade.grade > subjectAverage;
              let betterThanGeralAverage =
                grade.subjectId === -1 &&
                grade.grade > values.mediaSubjectGrades;

              return (
                <TableRow key={grade.id}>
                  <TableCell>
                    <StyledImage
                      src={grade.image_url || 'https://via.placeholder.com/50'}
                      alt={grade.name}
                    />
                  </TableCell>
                  <TableCell>{grade.name}</TableCell>
                  <TableCell>
                    <strong
                      style={{
                        color:
                          betterThanSubjectAverage || betterThanGeralAverage
                            ? '#43d669'
                            : 'inherit',
                      }}
                    >
                      {grade.grade?.toFixed(2) ?? '--'}
                    </strong>
                  </TableCell>
                  <TableCell>
                    <strong
                      style={{
                        color: grade.frequency < 75 ? 'orange' : 'inherit',
                      }}
                    >
                      {grade.frequency?.toFixed(2) ?? '--'}%
                    </strong>
                  </TableCell>
                  <TableCell>
                    {subjectId > -1 ? (
                      <GradeForm
                        subjectId={subjectId}
                        id={grade.id ?? -1}
                        studentId={grade.studentId}
                        grade={grade}
                      />
                    ) : (
                      <EditStudentModal
                        student={grade}
                        studentId={grade.studentId}
                        subjectId={subjectId}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentViewList;
