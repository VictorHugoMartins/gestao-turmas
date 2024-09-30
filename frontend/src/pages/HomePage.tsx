import React, { useEffect, useState } from 'react';
import { Typography, Box, Container, Grid } from '@mui/material';
import StatisticCards from '../components/Structure/StatisticsCards';
import SubjectList from '../components/List/SubjectList';
import NewClassModal from '../components/ModalForm/NewClassModal';
import NewStudentModal from '../components/ModalForm/NewStudentModal';
import Header from '../components/Structure/Header/Header';
import { useStudent } from '../contexts/StudentContext';
import { useSubject } from '../contexts/SubjectContext';

const Homepage: React.FC = () => {
  const { students } = useStudent();
  const { subjects } = useSubject();
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    setReload(true);
  }, [students, subjects]);

  return (
    <Container sx={{ p: 2 }} maxWidth={false}>
      <Header />

      <Container
        sx={{ mb: 4, p: 2, width: { lg: '90%', xs: '100%' } }}
        maxWidth={false}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            Resumo Geral das Turmas
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <NewClassModal />
            </Grid>
            <Grid item>
              <NewStudentModal />
            </Grid>
          </Grid>
        </Box>
        <StatisticCards reload={reload} />
      </Container>

      <Container
        sx={{ p: 2, width: { lg: '90%', xs: '100%' } }}
        maxWidth={false}
      >
        <SubjectList />
      </Container>
    </Container>
  );
};

export default Homepage;
