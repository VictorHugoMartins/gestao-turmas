import React, { useState } from "react";
import { useClassroom } from "../../contexts/ClassroomContext";
import {
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    TextField,
} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GenericModal from './GenericModal';
import { Classroom } from "../../types";

interface ClassroomMenuModalProps {
    classroom: Classroom;
}

const ClassroomMenuModal: React.FC<ClassroomMenuModalProps> = ({ classroom }) => {
    const { classrooms, criarClassroom, editarClassroom, removerClassroom } = useClassroom();
    const [novaClassroom, setNovaClassroom] = useState<string>("");
    const [activeTab, setActiveTab] = useState<number>(0);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [classroomEdit, setClassroomEdit] = useState<number | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditMode(false);
        setClassroomEdit(null);
        setNovaClassroom("");
    };

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, classroomId: number) => {
        setAnchorEl(event.currentTarget);
        setClassroomEdit(classroomId);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleEditClassroom = () => {
        const classroom = classrooms.find(t => t.id === classroomEdit);
        if (classroom) {
            setNovaClassroom(classroom.name);
            setEditMode(true);
            setOpenModal(true);
        }
        handleCloseMenu();
    };

    const handleDeleteClassroom = () => {
        if (classroomEdit) {
            removerClassroom(classroomEdit);
            if (activeTab === classrooms.length - 1) {
                setActiveTab(activeTab - 1);
            }
        }
        handleCloseMenu();
    };

    const handleSubmit = () => {
        if (editMode && classroomEdit) {
            editarClassroom(classroomEdit, novaClassroom);
        } else {
            criarClassroom(novaClassroom);
        }
        handleCloseModal();
    };

    return (
        <>

            {classroom?.id && (classroom.id > -1) &&
                <IconButton
                    size="small"
                    onClick={(e) => handleOpenMenu(e, classroom.id ?? -1)}
                    className="classroom-list-settings-icon"
                >
                    <SettingsIcon />
                </IconButton>
            }

            <GenericModal
                open={openModal}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                title={editMode ? "Editar Turma" : "Criar Nova Turma"}
                submitText={editMode ? "Salvar" : "Criar"}
            >
                <TextField
                    label="Nome da Turma"
                    value={novaClassroom}
                    onChange={(e) => setNovaClassroom(e.target.value)}
                    className="classroom-list-textfield"
                    fullWidth
                />
            </GenericModal>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                <MenuItem onClick={handleEditClassroom}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    Editar
                </MenuItem>
                <MenuItem onClick={handleDeleteClassroom}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    Remover
                </MenuItem>
            </Menu>
        </>
    );
};

export default ClassroomMenuModal;
