import { Request, Response } from 'express';
import { getStudents, saveStudents } from '../repositories/studentRepository';
import { getStudentViews, saveStudentViews } from '../repositories/gradeRepository';
import Student from '../models/Student';
import Classroom from '../models/Classroom';
import { getClassrooms } from '../repositories/classroomRepository';
import Grade from '../models/Grade';

const defaultImgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkTGe0AZKFaM2GAuyv--ob1HDeJD3b315X5A&s';

// Criar ou atualizar um student
const createStudent = (req: Request, res: Response) => {
    const students: Student[] = getStudents();
    const classrooms: Classroom[] = getClassrooms();
    const grades: Grade[] = getStudentViews();
    const { name, image_url, frequency, studentViews } = req.body;
    
    const studentExistente = students?.find(student => student.name === name);
    if (studentExistente) {
        return res.status(400).json({ message: "Erro: Aluno já existe." });
    }

    const novoStudent: Student = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name,
        image_url: image_url || defaultImgUrl,
        frequency
    };

    // Adiciona o novo aluno à lista de students
    students.push(novoStudent);
    saveStudents(students);

    // Para cada turma existente, cria uma nota inicial para o novo aluno
    classrooms.forEach((classroom) => {
        const gradeInput = studentViews?.find((input: { classroomId: number }) => input.classroomId === classroom.id);
        
        if ( gradeInput ){
        const novaNota: Grade = {
            id: grades.length > 0 ? grades[grades.length - 1].id + 1 : 1,
            studentId: novoStudent.id,
            classroomId: classroom.id,
            grade: gradeInput ? gradeInput.grade : 0,
        };

        grades.push(novaNota);
    }
    });

    // Salva as notas atualizadas
    saveStudentViews(grades);

    res.status(201).json({ message: "Aluno criado com sucesso e notas atribuídas em todas as turmas!", data: novoStudent });
};

// Editar um student
const updateStudent = (req: Request, res: Response) => {
    const students: Student[] = getStudents();
    const studentId = parseInt(req.params.studentId);
    const { name, image_url, frequency } = req.body;

    const student = students?.find(a => a.id === studentId);
    if (!student) {
        return res.status(404).json({ message: "Erro: Aluno não encontrado." });
    }

    student.name = name || student.name;
    student.image_url = image_url || student.image_url;
    student.frequency = frequency || student.frequency;

    saveStudents(students);
    res.status(200).json({ message: "Aluno atualizado com sucesso!", data: student });
};

// Remover um student
const deleteStudent = (req: Request, res: Response) => {
    const students: Student[] = getStudents();
    const studentId = parseInt(req.params.studentId);

    const studentIndex = students?.findIndex(a => a.id === studentId);
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
        const grades = getStudentViews();
        const classrooms = getClassrooms();

        const classroom = classrooms?.find((t: Classroom) => t?.id === classroomId);
        if (!classroom) {
            return res.status(200).json({ message: "Sem dados", data: [] });
        }

        const resultado = students.map(student => {
            const grade = grades?.find((grade: Grade) => grade.studentId === student.id && grade.classroomId === classroomId);
            return {
                id: grade ? grade.id : null,
                image_url: student.image_url,
                name: student.name,
                studentId: student.id,
                grade: grade ? grade.grade : null,
                frequency: student.frequency,
                classroomId: classroomId,
                nameClassroom: classroom.name
            };
        });

        const resultadoOrdenado = resultado.sort((a, b) => a.name.localeCompare(b.name));

        res.json({ message: "Requisição realizada com sucesso!", data: resultadoOrdenado });
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar alunos." });
    }
};

// Obter dados de resumo
const listStudentsMedias = (req: Request, res: Response) => {
    try {
        const students: Student[] = getStudents();
        const grades = getStudentViews();

        // Mapeia as notas por turma
        const classroomMap: { [key: number]: { totalStudentViews: number; totalStudents: number; } } = {};

        // Itera sobre as notas para agregar as informações por classroom
        grades.forEach((grade: Grade) => {
            if (!classroomMap[grade.classroomId]) {
                classroomMap[grade.classroomId] = { totalStudentViews: 0, totalStudents: 0 };
            }
            classroomMap[grade.classroomId].totalStudentViews += grade.grade || 0;
            classroomMap[grade.classroomId].totalStudents += 1; // Incrementa o número de alunos na turma
        });

        // Itera sobre os alunos para calcular as médias
        const resultado: any[] = students.map(student => {
            // Filtra as notas do aluno
            const gradesDoStudent = grades.filter((grade: Grade) => grade.studentId === student.id);

            let somaNotas = 0;
            let totalTurmas = 0;

            // Soma as notas e conta as turmas
            gradesDoStudent.forEach((grade: Grade) => {
                const classroomInfo = classroomMap[grade.classroomId];
                if (classroomInfo) {
                    somaNotas += grade.grade || 0; // Soma a nota do aluno
                    totalTurmas += 1; // Incrementa o número de turmas em que o aluno está
                }
            });

            // Calcula a média
            const mediaAluno = totalTurmas > 0 ? somaNotas / totalTurmas : null;

            return {
                studentId: student.id,
                classroomId: -1,
                image_url: student.image_url,
                name: student.name,
                grade: mediaAluno,
                frequency: student.frequency,
            };
        });

        // Ordena o resultado alfabeticamente pelo nome do aluno
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
