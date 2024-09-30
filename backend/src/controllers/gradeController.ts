import { Request, Response } from "express";
import {
  getStudentViews,
  saveStudentViews,
} from "../repositories/gradeRepository";
import { SubjectInterface } from "../models/Subject";
import { getSubjects } from "../repositories/subjectRepository";
import Grade, { GradeInterface } from "../models/Grade";

// Criar ou atualizar uma grade para um student em uma subject
const createOrUpdateStudentView = (req: Request, res: Response) => {
  const { grade } = req.body;
  const subjectId = parseInt(req.params.subjectId);
  const studentId = parseInt(req.params.studentId);

  const grades: Grade[] = getStudentViews();

  if (grade < 0 || grade > 10) {
    return res
      .status(400)
      .json({ message: "A nota deve estar entre 0 e 10." });
  }

  const novaStudentView: Grade = {
    id: grades.length > 0 ? grades[grades.length - 1].id + 1 : 1,
    studentId: studentId,
    subjectId: subjectId,
    grade: grade,
  };

  grades.push(novaStudentView);
  saveStudentViews(grades);
  return res
    .status(201)
    .json({ message: "Dados criados com sucesso! Por favor, Atualize a página!", data: novaStudentView });
};

// Atualizar uma nota existente para um student em uma subject
const updateStudentView = (req: Request, res: Response) => {
  const { grade } = req.body;
  const subjectId = parseInt(req.params.subjectId);
  const studentId = parseInt(req.params.studentId);

  let grades: Grade[] = getStudentViews();

  if (grade < 0 || grade > 10) {
    return res
      .status(400)
      .json({ message: "A nota deve estar entre 0 e 10." });
  }

  const gradeExistente = grades?.find(
    (n) => n.studentId === studentId && n.subjectId === subjectId,
  );

  if (gradeExistente) {
    gradeExistente.grade = grade;
    saveStudentViews(grades);
    return res
      .status(200)
      .json({ message: "Nota atualizada com sucesso! Por favor, Atualize a página!", data: gradeExistente });
  } else {
    return res
      .status(404)
      .json({
        message: "Nota não encontrada para este aluno e sala de aula.",
      });
  }
};

const getStatisticsBySubject = (req: Request, res: Response) => {
  try {
    const gradesData: GradeInterface[] = getStudentViews();
    const subjectsData: SubjectInterface[] = getSubjects();

    if (!gradesData.length) {
      return res
        .status(200)
        .json({ message: "Nenhum dado de alunos encontrado." });
    }

    // Calcular médias por Turma
    const mediasPorSubject = gradesData.reduce(
      (acc, grade) => {
        const { subjectId, grade: gradeStudent } = grade;

        if (!acc[subjectId]) {
          acc[subjectId] = {
            totalStudentViews: 0,
            contador: 0,
          };
        }

        acc[subjectId].totalStudentViews += gradeStudent || 0;
        acc[subjectId].contador += 1;

        return acc;
      },
      {} as Record<number, { totalStudentViews: number; contador: number }>,
    );

    // Criar um array de médias para todas as subjects, incluindo as sem notas
    const mediaPorSubject = subjectsData.map(
      (subject: SubjectInterface) => {
        const subjectStats = mediasPorSubject[subject.id];

        return {
          subjectId: subject.id,
          subjectName: subject.name,
          mediaSubjectGrades: subjectStats
            ? subjectStats.totalStudentViews / subjectStats.contador
            : null,
        };
      },
    );

    // Calcular a média geral (soma das médias de cada turma / quantidade de turmas)
    const somaMediasPorSubject = mediaPorSubject.reduce(
      (sum, subject) => {
        return sum + (subject.mediaSubjectGrades || 0);
      },
      0,
    );

    const mediaSubjectGrades = somaMediasPorSubject / subjectsData.length;

    res.status(200).json({
      message: "Requisição realizada com sucesso! Por favor, Atualize a página!",
      data: {
        mediaPorSubject,
        mediaSubjectGrades, // Média geral
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter estatísticas." });
  }
};

export {
  createOrUpdateStudentView,
  updateStudentView,
  getStatisticsBySubject,
};
