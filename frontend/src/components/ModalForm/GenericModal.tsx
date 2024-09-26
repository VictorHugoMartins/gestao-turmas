import React, { ReactNode } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

interface GenericModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit?: () => void;
    title: string;
    children: ReactNode;
    submitText?: string;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const GenericModal: React.FC<GenericModalProps> = ({ open, onClose, onSubmit, title, children, submitText, maxWidth = 'sm' }) => {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: maxWidth || 'sm',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6" component="h2" gutterBottom>
                    {title}
                </Typography>
                <Box sx={{ mt: 2 }}>
                    {children}
                </Box>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={onClose} variant="outlined" color="error">
                        Fechar
                    </Button>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {onSubmit && (
                            <Button onClick={onSubmit} variant="contained" color="primary">
                                {submitText || 'Salvar'}
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default GenericModal;