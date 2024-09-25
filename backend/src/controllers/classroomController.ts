import { Request, Response } from 'express';
import Classroom from '../models/Classroom';
import { getClassrooms, saveClassrooms } from '../repositories/classroomRepository';

// Criar uma nova classroom
const createClassroom = (req: Request, res: Response) => {
    const classrooms: Classroom[] = getClassrooms();
    const { name } = req.body;

    const classroomExistente = classrooms.find(classroom => classroom.name === name);
    if (classroomExistente) {
        return res.status(400).json({ message: "Erro: Turma já existe." });
    }

    const novaClassroom: Classroom = {
        id: classrooms.length > 0 ? classrooms[classrooms.length - 1].id + 1 : 1,
        name
    };

    classrooms.push(novaClassroom);
    saveClassrooms(classrooms);
    res.status(201).json({ message: "Turma criada com sucesso!", data: novaClassroom });
};

// Editar uma classroom
const updateClassroom = (req: Request, res: Response) => {
    const classrooms: Classroom[] = getClassrooms();
    const classroomId = parseInt(req.params.classroomId);
    const { name } = req.body;

    const classroom = classrooms.find(t => t.id === classroomId);
    if (!classroom) {
        return res.status(404).json({ message: "Erro: Turma não encontrada." });
    }

    classroom.name = name || classroom.name;

    saveClassrooms(classrooms);
    res.status(200).json({ message: "Turma atualizada com sucesso!", data: classroom });
};

// Remover uma classroom
const deleteClassroom = (req: Request, res: Response) => {
    const classrooms: Classroom[] = getClassrooms();
    const classroomId = parseInt(req.params.classroomId);

    const classroomIndex = classrooms.findIndex(t => t.id === classroomId);
    if (classroomIndex === -1) {
        return res.status(404).json({ message: "Erro: Turma não encontrada." });
    }

    classrooms.splice(classroomIndex, 1);
    saveClassrooms(classrooms);
    res.status(200).json({ message: "Turma removida com sucesso!" });
};

// Listar classrooms
const listClassrooms = (req: Request, res: Response) => {
    const classrooms: Classroom[] = getClassrooms();
    const classroomResumo = {
        id: -1,
        name: "RESUMO DAS TURMAS"
    };
    res.json({ message: "Requisição realizada com sucesso!", data: [classroomResumo, ...classrooms] });
};

export {
    createClassroom,
    updateClassroom,
    deleteClassroom,
    listClassrooms
};