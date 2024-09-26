import React from 'react';
import { Typography, Container } from '@mui/material';

const Header: React.FC = () => {
    return (
        <Container component="header"
            sx={{ background: 'linear-gradient(135deg, #7a7abc 0%, #d0d4e1 100%)', color: '#F0F0F0', p: 2, borderRadius: 2, mb: 4 }}
            maxWidth={false}
        >
            <Typography variant="h5" gutterBottom>
                Olá, Professor Carlos!
            </Typography>
            <Typography variant="body1">
                Nesta plataforma, além de lançar notas e fazer o acompanhamento dos seus alunos, você também pode incluir novos alunos ou turmas.
            </Typography>
        </Container>
    );
};

export default Header;
