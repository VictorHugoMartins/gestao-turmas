import { Request, Response } from 'express';
import { getStudents, saveStudents } from '../repositories/studentRepository';
import { getGradedStudents } from '../repositories/gradedStudentRepository';
import Student from '../models/Student';
import GradedStudent from '../models/GradedStudent';
import Classroom from '../models/Classroom';
import { getClassrooms } from '../repositories/classroomRepository';

// Criar ou atualizar um student
const createStudent = (req: Request, res: Response) => {
    const students: Student[] = getStudents();
    const { name, image_url } = req.body;

    const studentExistente = students.find(student => student.name === name);
    if (studentExistente) {
        return res.status(400).json({ message: "Erro: Student já existe." });
    }

    const novoStudent: Student = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name,
        image_url: image_url || 'https://via.placeholder.com/50'
    };

    students.push(novoStudent);
    saveStudents(students);
    res.status(201).json({ message: "Aluno criado com sucesso!", data: novoStudent });
};

// Editar um student
const updateStudent = (req: Request, res: Response) => {
    const students: Student[] = getStudents();
    const studentId = parseInt(req.params.studentId);
    const { name, image_url } = req.body;

    const student = students.find(a => a.id === studentId);
    if (!student) {
        return res.status(404).json({ message: "Erro: Aluno não encontrado." });
    }

    student.name = name || student.name;
    student.image_url = image_url || student.image_url;

    saveStudents(students);
    res.status(200).json({ message: "Aluno atualizado com sucesso!", data: student });
};

// Remover um student
const deleteStudent = (req: Request, res: Response) => {
    const students: Student[] = getStudents();
    const studentId = parseInt(req.params.studentId);

    const studentIndex = students.findIndex(a => a.id === studentId);
    if (studentIndex === -1) {
        return res.status(404).json({ message: "Erro: Aluno não encontrado." });
    }

    students.splice(studentIndex, 1);
    saveStudents(students);
    res.status(200).json({ message: "Aluno removido com sucesso!" });
};

const listarStudents = (req: Request, res: Response) => {
    try {
        const classroomId = parseInt(req.params.classroomId);
        const students: Student[] = getStudents();
        const grades = getGradedStudents();
        const classrooms = getClassrooms();

        const classroom = classrooms.find((t: Classroom) => t?.id === classroomId);
        if (!classroom) {
            return res.status(200).json({ message: "Sem dados", data: [] });
        }

        const resultado = students.map(student => {
            const grade = grades.find((grade: GradedStudent) => grade.studentId === student.id && grade.classroomId === classroomId);
            return {
                id: grade ? grade.id : null,
                image_url: student.image_url,
                name: student.name,
                studentId: student.id,
                grade: grade ? grade.grade : null,
                frequency: grade ? grade.frequency : null,
                classroomId: classroomId,
                nameClassroom: classroom.name
            };
        });

        res.json({ message: "Requisição realizada com sucesso!", data: resultado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar alunos." });
    }
};

const listStudentsMedias = (req: Request, res: Response) => {
    try {
        const students: Student[] = getStudents();
        const grades = getGradedStudents();

        // Objeto para armazenar as informações das classrooms
        const classroomMap: { [key: number]: { totalGradedStudents: number; totalFrequencys: number; totalStudents: number; } } = {};

        // Itera sobre as grades para agregar as informações por classroom
        grades.forEach((grade: GradedStudent) => {
            if (!classroomMap[grade.classroomId]) {
                classroomMap[grade.classroomId] = { totalGradedStudents: 0, totalFrequencys: 0, totalStudents: 0 };
            }
            classroomMap[grade.classroomId].totalGradedStudents += grade.grade || 0;
            classroomMap[grade.classroomId].totalFrequencys += grade.frequency || 0;
            classroomMap[grade.classroomId].totalStudents += 1; // Incrementa o número de students na classroom
        });

        // Agora, itera sobre os students para calcular as médias
        const resultado: any[] = students.map(student => {
            const gradesDoStudent = grades.filter((grade: GradedStudent) => grade.studentId === student.id);

            // Inicializa acumuladores para as médias
            let somaGradedStudents = 0;
            let somaFrequencias = 0;
            let totalClassrooms = 0;

            gradesDoStudent.forEach((grade: GradedStudent) => {
                const classroomInfo = classroomMap[grade.classroomId];
                if (classroomInfo) {
                    // Calcula a média da classroom
                    const mediaClassroomGradedStudent = classroomInfo.totalGradedStudents / classroomInfo.totalStudents;
                    const mediaClassroomFrequencia = classroomInfo.totalFrequencys / classroomInfo.totalStudents;

                    // Acumula as médias
                    somaGradedStudents += mediaClassroomGradedStudent; // Soma as médias das classrooms
                    somaFrequencias += mediaClassroomFrequencia; // Soma as médias das frequências
                    totalClassrooms += 1; // Incrementa o número de classrooms que o student participa
                }
            });

            return {
                image_url: student.image_url,
                name: student.name,
                grade: totalClassrooms > 0 ? somaGradedStudents / totalClassrooms : null, // Média das grades
                frequency: totalClassrooms > 0 ? somaFrequencias / totalClassrooms : null, // Média das frequências
            };
        });

        // Ordena o resultado alfabeticamente pelo name do student
        const resultadoOrdenado = resultado.sort((a, b) => a.name.localeCompare(b.name));

        res.json({ message: "Requisição realizada com sucesso!", data: resultadoOrdenado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar médias de notas e frequências." });
    }
};



export {
    createStudent,
    updateStudent,
    deleteStudent,
    listarStudents,
    listStudentsMedias,
};
