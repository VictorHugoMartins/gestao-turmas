import { Request, Response } from 'express';
import GradedStudent from '../models/GradedStudent';
import { getGradedStudents, saveGradedStudents } from '../repositories/gradedStudentRepository';
import Classroom from '../models/Classroom';
import { getClassrooms } from '../repositories/classroomRepository';
import { getStudents } from '../repositories/studentRepository';

// Criar ou atualizar uma grade para um student em uma classroom
const createOrUpdateGradedStudent = (req: Request, res: Response) => {
    const { grade, frequency } = req.body;
    const classroomId = parseInt(req.params.classroomId);
    const studentId = parseInt(req.params.studentId);

    const grades: GradedStudent[] = getGradedStudents();

    console.log(req.params);

    if (grade < 0 || grade > 10) {
        return res.status(400).json({ message: "Erro: A nota deve estar entre 0 e 10." });
    }

    if (frequency < 0 || frequency > 100) {
        return res.status(400).json({ message: "Erro: A frequência deve estar entre 0 e 100." });
    }

    // Verifica se já existe uma grade para o student na classroom
    const gradeExistente = grades.find(n => n.studentId === studentId && n.classroomId === classroomId);

    if (gradeExistente) {
        // Atualiza a grade existente
        gradeExistente.grade = grade;
        gradeExistente.frequency = frequency;

        saveGradedStudents(grades);
        return res.status(200).json({ message: "Dados atualizados com sucesso!", data: gradeExistente });
    } else {
        // Cria uma nova grade
        const novaGradedStudent: GradedStudent = {
            id: grades.length > 0 ? grades[grades.length - 1].id + 1 : 1,
            studentId: studentId,
            classroomId: classroomId,
            grade: grade,
            frequency: frequency
        };

        grades.push(novaGradedStudent);
        saveGradedStudents(grades);
        return res.status(201).json({ message: "Dados criados com sucesso!", data: novaGradedStudent });
    }
};

// Obter grades por student e classroom
const getGradedStudentsByStudentAndClassroom = (req: Request, res: Response) => {
    const classroomId = parseInt(req.params.classroomId);
    const studentId = parseInt(req.params.studentId);

    const grades: GradedStudent[] = getGradedStudents();

    const gradesStudentClassroom = grades.filter(grade => grade.classroomId === classroomId && grade.studentId === studentId);

    if (gradesStudentClassroom.length > 0) {
        res.status(200).json({ message: "Requisição realizada com sucesso!", data: gradesStudentClassroom });
    } else {
        res.status(200).json({ message: "Sem dados", data: [] });
    }
};

// Obter dados de resumo por classroom
const getStatisticsByClassroom = (req: Request, res: Response) => {
    try {
        const gradesData: GradedStudent[] = getGradedStudents();
        const classroomsData = getClassrooms();

        const qtdStudents = getStudents()?.length;

        const totalGradedStudents = gradesData.length;
        const totalGradedStudent = gradesData.reduce((sum: number, grade: GradedStudent) => sum + (grade.grade || 0), 0);
        const totalFrequency = gradesData.reduce((sum: number, grade: GradedStudent) => sum + (grade.frequency || 0), 0);

        const mediaGradedStudent = totalGradedStudents > 0 ? totalGradedStudent / totalGradedStudents : 0;
        const mediaFrequency = totalGradedStudents > 0 ? totalFrequency / totalGradedStudents : 0;

        // Calcular médias por classroom
        const mediasPorClassroom = gradesData.reduce((acc, grade) => {
            const { classroomId, grade: gradeStudent, frequency } = grade;

            if (!acc[classroomId]) {
                acc[classroomId] = {
                    totalGradedStudents: 0,
                    totalFrequency: 0,
                    contador: 0,
                };
            }

            acc[classroomId].totalGradedStudents += gradeStudent || 0;
            acc[classroomId].totalFrequency += frequency || 0;
            acc[classroomId].contador += 1;

            return acc;
        }, {} as Record<number, { totalGradedStudents: number, totalFrequency: number, contador: number }>);

        // Criar um array de médias para todas as classrooms, incluindo as sem grades
        const mediaPorClassRoom = classroomsData.map((classroom: Classroom) => {
            const classroomStats = mediasPorClassroom[classroom.id];

            return {
                classroomId: classroom.id,
                classroomName: classroom.name,
                mediaGradedStudent: classroomStats ? (classroomStats.totalGradedStudents / classroomStats.contador) : null,
                mediaFrequency: classroomStats ? (classroomStats.totalFrequency / classroomStats.contador) : null,
            };
        });

        res.status(200).json({
            message: "Requisição realizada com sucesso!",
            data: {
                mediaGradedStudent,
                mediaFrequency,
                totalStudents: qtdStudents,
                mediaPorClassRoom,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter estatísticas." });
    }
};

export {
    createOrUpdateGradedStudent,
    getGradedStudentsByStudentAndClassroom,
    getStatisticsByClassroom
};