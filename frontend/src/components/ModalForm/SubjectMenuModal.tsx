import React, { useState } from 'react';
import { useSubject } from '../../contexts/SubjectContext';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  TextField,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GenericModal from './GenericModal';
import { Subject } from '../../types';

interface SubjectMenuModalProps {
  subject: Subject;
}

const SubjectMenuModal: React.FC<SubjectMenuModalProps> = ({
  subject,
}) => {
  const { subjects, criarSubject, editarSubject, removerSubject } =
    useSubject();
  const [novaSubject, setNovaSubject] = useState<string>('');
  const [activeTab, setActiveTab] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [subjectEdit, setSubjectEdit] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditMode(false);
    setSubjectEdit(null);
    setNovaSubject('');
  };

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    subjectId: number,
  ) => {
    setAnchorEl(event.currentTarget);
    setSubjectEdit(subjectId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditSubject = () => {
    const subject = subjects.find((t) => t.id === subjectEdit);
    if (subject) {
      setNovaSubject(subject.name);
      setEditMode(true);
      setOpenModal(true);
    }
    handleCloseMenu();
  };

  const handleDeleteSubject = () => {
    if (subjectEdit) {
      removerSubject(subjectEdit);
      if (activeTab === subjects.length - 1) {
        setActiveTab(activeTab - 1);
      }
    }
    handleCloseMenu();
  };

  const handleSubmit = () => {
    if (editMode && subjectEdit) {
      editarSubject(subjectEdit, novaSubject);
    } else {
      criarSubject(novaSubject);
    }
    handleCloseModal();
  };

  return (
    <>
      {subject?.id && subject.id > -1 && (
        <IconButton
          size="small"
          onClick={(e) => handleOpenMenu(e, subject.id ?? -1)}
          className="subject-list-settings-icon"
        >
          <SettingsIcon />
        </IconButton>
      )}

      <GenericModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title={editMode ? 'Editar Turma' : 'Criar Nova Turma'}
        submitText={editMode ? 'Salvar' : 'Criar'}
      >
        <TextField
          label="Nome da Turma"
          value={novaSubject}
          onChange={(e) => setNovaSubject(e.target.value)}
          className="subject-list-textfield"
          fullWidth
        />
      </GenericModal>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleEditSubject}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Editar
        </MenuItem>
        <MenuItem onClick={handleDeleteSubject}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Remover
        </MenuItem>
      </Menu>
    </>
  );
};

export default SubjectMenuModal;
