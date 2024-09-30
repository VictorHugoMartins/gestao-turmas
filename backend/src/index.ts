import express from "express";
import cors from "cors";
import * as studentController from "./controllers/studentController";
import * as subjectController from "./controllers/subjectController";
import * as gradeController from "./controllers/gradeController";

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

// Rotas de students
app.post("/api/students", studentController.createStudent); // ok
app.put("/api/students/:studentId", studentController.updateStudent); // ok
app.delete("/api/students/:studentId", studentController.deleteStudent); // ok
app.get(
  "/api/subjects/:subjectId/ListarStudents",
  studentController.listarStudents,
); // ok
app.get(
  "/api/students/ListarMediaStudentViewsFrequency",
  studentController.listStudentsMedias,
); // ok

// Rotas de subjects
app.post("/api/subjects", subjectController.createSubject); // ok
app.put("/api/subjects/:subjectId", subjectController.updateSubject); // ok
app.delete("/api/subjects/:subjectId", subjectController.deleteSubject); // ok
app.get("/api/subjects/ListarSubjects", subjectController.listSubjects); // ok

// Rotas de grades
app.get("/api/grades/statistics", gradeController.getStatisticsBySubject); // ok
app.put(
  "/api/grades/:subjectId/students/:studentId",
  gradeController.updateStudentView,
); // ok

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
