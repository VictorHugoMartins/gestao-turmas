import { Request, Response } from "express";
import {
  getStudentViews,
  saveStudentViews,
} from "../repositories/gradeRepository";
import { ClassroomInterface } from "../models/Classroom";
import { getClassrooms } from "../repositories/classroomRepository";
import Grade, { GradeInterface } from "../models/Grade";

// Criar ou atualizar uma grade para um student em uma classroom
const createOrUpdateStudentView = (req: Request, res: Response) => {
  const { grade } = req.body;
  const classroomId = parseInt(req.params.classroomId);
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
    classroomId: classroomId,
    grade: grade,
  };

  grades.push(novaStudentView);
  saveStudentViews(grades);
  return res
    .status(201)
    .json({ message: "Dados criados com sucesso!", data: novaStudentView });
};

// Atualizar uma nota existente para um student em uma classroom
const updateStudentView = (req: Request, res: Response) => {
  const { grade } = req.body;
  const classroomId = parseInt(req.params.classroomId);
  const studentId = parseInt(req.params.studentId);

  let grades: Grade[] = getStudentViews();

  if (grade < 0 || grade > 10) {
    return res
      .status(400)
      .json({ message: "A nota deve estar entre 0 e 10." });
  }

  const gradeExistente = grades?.find(
    (n) => n.studentId === studentId && n.classroomId === classroomId,
  );

  if (gradeExistente) {
    gradeExistente.grade = grade;
    saveStudentViews(grades);
    return res
      .status(200)
      .json({ message: "Nota atualizada com sucesso!", data: gradeExistente });
  } else {
    return res
      .status(404)
      .json({
        message: "Nota não encontrada para este aluno e sala de aula.",
      });
  }
};

const getStatisticsByClassroom = (req: Request, res: Response) => {
  try {
    const gradesData: GradeInterface[] = getStudentViews();
    const classroomsData: ClassroomInterface[] = getClassrooms();

    if (!gradesData.length) {
      return res
        .status(200)
        .json({ message: "Nenhum dado de alunos encontrado." });
    }

    // Calcular médias por Turma
    const mediasPorClassroom = gradesData.reduce(
      (acc, grade) => {
        const { classroomId, grade: gradeStudent } = grade;

        if (!acc[classroomId]) {
          acc[classroomId] = {
            totalStudentViews: 0,
            contador: 0,
          };
        }

        acc[classroomId].totalStudentViews += gradeStudent || 0;
        acc[classroomId].contador += 1;

        return acc;
      },
      {} as Record<number, { totalStudentViews: number; contador: number }>,
    );

    // Criar um array de médias para todas as classrooms, incluindo as sem notas
    const mediaPorClassroom = classroomsData.map(
      (classroom: ClassroomInterface) => {
        const classroomStats = mediasPorClassroom[classroom.id];

        return {
          classroomId: classroom.id,
          classroomName: classroom.name,
          mediaClassroomGrades: classroomStats
            ? classroomStats.totalStudentViews / classroomStats.contador
            : null,
        };
      },
    );

    // Calcular a média geral (soma das médias de cada turma / quantidade de turmas)
    const somaMediasPorClassroom = mediaPorClassroom.reduce(
      (sum, classroom) => {
        return sum + (classroom.mediaClassroomGrades || 0);
      },
      0,
    );

    const mediaClassroomGrades = somaMediasPorClassroom / classroomsData.length;

    res.status(200).json({
      message: "Requisição realizada com sucesso!",
      data: {
        mediaPorClassroom,
        mediaClassroomGrades, // Média geral
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter estatísticas." });
  }
};

export {
  createOrUpdateStudentView,
  updateStudentView,
  getStatisticsByClassroom,
};
