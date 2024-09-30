import { Request, Response } from "express";
import Subject from "../models/Subject";
import {
  getSubjects,
  saveSubjects,
} from "../repositories/subjectRepository";

// Criar uma nova subject
const createSubject = (req: Request, res: Response) => {
  const subjects: Subject[] = getSubjects();
  const { name } = req.body;

  const subjectExistente = subjects?.find(
    (subject) => subject.name === name,
  );
  if (subjectExistente) {
    return res.status(400).json({ message: "Turma já existe." });
  }

  const novaSubject: Subject = {
    id: subjects.length > 0 ? subjects[subjects.length - 1].id + 1 : 1,
    name,
  };

  subjects.push(novaSubject);
  saveSubjects(subjects);
  res
    .status(201)
    .json({ message: "Turma criada com sucesso!", data: novaSubject });
};

// Editar uma subject
const updateSubject = (req: Request, res: Response) => {
  const subjects: Subject[] = getSubjects();
  const subjectId = parseInt(req.params.subjectId);
  const { name } = req.body;

  const subject = subjects?.find((t) => t.id === subjectId);
  if (!subject) {
    return res.status(404).json({ message: "Turma não encontrada." });
  }

  subject.name = name || subject.name;

  saveSubjects(subjects);
  res
    .status(200)
    .json({ message: "Turma atualizada com sucesso!", data: subject });
};

// Remover uma subject
const deleteSubject = (req: Request, res: Response) => {
  const subjects: Subject[] = getSubjects();
  const subjectId = parseInt(req.params.subjectId);

  const subjectIndex = subjects?.findIndex((t) => t.id === subjectId);
  if (subjectIndex === -1) {
    return res.status(404).json({ message: "Turma não encontrada." });
  }

  subjects.splice(subjectIndex, 1);
  saveSubjects(subjects);
  res.status(200).json({ message: "Turma removida com sucesso!" });
};

// Listar subjects
const listSubjects = (req: Request, res: Response) => {
  const subjects: Subject[] = getSubjects();
  const subjectResumo = {
    id: -1,
    name: "RESUMO DAS TURMAS",
  };
  res.json({
    message: "Requisição realizada com sucesso!",
    data: [subjectResumo, ...subjects],
  });
};

export { createSubject, updateSubject, deleteSubject, listSubjects };
