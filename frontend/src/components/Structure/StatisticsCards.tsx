import React, { useEffect } from 'react';
import { Card, Typography, Grid, Box } from '@mui/material';
import { useStatistics } from '../../contexts/StatisticsContext';

interface StatisticsCardsProps {
  reload: boolean;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({ reload }) => {
  const { values, fetchStatistics } = useStatistics();

  useEffect(() => {
    const fetchData = async () => {
      await fetchStatistics();
    };

    if (reload) {
      fetchData();
    }
  }, [reload]);

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ p: 2 }}>
            <Typography variant="caption">Nota Média das Turmas</Typography>
            <Typography variant="h5">{values.mediaClassroomGrades?.toFixed(2)}</Typography>
          </Card>
        </Grid>
        {values.mediaPorClassroom?.map((item) => (
          <Grid item xs={12} sm={6} md={2}>
            <Card sx={{ p: 2 }}>
              <Typography variant="caption">Nota média de {item.classroomName}</Typography>
              <Typography variant="h5">{item.mediaClassroomGrades?.toFixed(2) ?? "--"}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatisticsCards;