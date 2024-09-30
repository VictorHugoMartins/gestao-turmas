export interface GradeInterface {
  id: number;
  studentId: number;
  subjectId: number;
  grade: number;
}

class Grade implements GradeInterface {
  id: number;
  studentId: number;
  subjectId: number;
  grade: number;

  constructor(
    id: number,
    studentId: number,
    subjectId: number,
    grade: number,
  ) {
    this.id = id;
    this.studentId = studentId;
    this.subjectId = subjectId;
    this.grade = grade;
  }
}

export default Grade;
