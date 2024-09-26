import express from 'express';
import cors from 'cors';
import * as studentController from './controllers/studentController';
import * as classroomController from './controllers/classroomController';
import * as gradeController from './controllers/gradeController';

const app = express();
const port = 5000;

app.use(cors({
    origin: '*'
}));

app.use(express.json());

// Rotas de students
app.post('/api/students', studentController.createStudent); // ok
app.put('/api/students/:studentId', studentController.updateStudent); // ok
app.delete('/api/students/:studentId', studentController.deleteStudent); // ok
app.get('/api/classrooms/:classroomId/ListarStudents', studentController.listarStudents); // ok
app.get('/api/students/ListarMediaStudentViewsFrequency', studentController.listStudentsMedias); // ok

// Rotas de classrooms
app.post('/api/classrooms', classroomController.createClassroom); // ok
app.put('/api/classrooms/:classroomId', classroomController.updateClassroom); // ok
app.delete('/api/classrooms/:classroomId', classroomController.deleteClassroom); // ok
app.get('/api/classrooms/ListarClassrooms', classroomController.listClassrooms); // ok

// Rotas de grades
app.get('/api/grades/statistics', gradeController.getStatisticsByClassroom); // ok
app.put('/api/grades/:classroomId/students/:studentId', gradeController.updateStudentView); // ok

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});