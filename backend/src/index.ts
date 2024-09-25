import express, { Request, Response } from 'express';
import cors from 'cors';
import * as studentController from './controllers/studentController';
import * as classroomController from './controllers/classroomController';
import * as gradeController from './controllers/gradedStudentController';

const app = express();
const port = 5000;

app.use(cors({
    origin: '*'
}));

app.use(express.json());

// Rotas de students
app.post('/api/students', studentController.createStudent);
app.put('/api/students/:studentId', studentController.updateStudent);
app.delete('/api/students/:studentId', studentController.deleteStudent);
app.get('/api/classrooms/:classroomId/ListarStudents', studentController.listarStudents);
app.get('/api/students/ListarMediaGradedStudentsFrequency', studentController.listStudentsMedias);

// Rotas de classrooms
app.post('/api/classrooms', classroomController.createClassroom);
app.put('/api/classrooms/:classroomId', classroomController.updateClassroom);
app.delete('/api/classrooms/:classroomId', classroomController.deleteClassroom);
app.get('/api/classrooms/ListarClassrooms', classroomController.listClassrooms);

// Rotas de grades
app.post('/api/classrooms/:classroomId/students/:studentId/grades', gradeController.createOrUpdateGradedStudent);
app.get('/api/classrooms/:classroomId/students/:studentId/grades', gradeController.getGradedStudentsByStudentAndClassroom);
app.get('/api/classrooms/statistics', gradeController.getStatisticsByClassroom);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});