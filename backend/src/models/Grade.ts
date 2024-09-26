export interface GradeInterface {
  id: number;
  studentId: number;
  classroomId: number;
  grade: number;
}

class Grade implements GradeInterface {
  id: number;
  studentId: number;
  classroomId: number;
  grade: number;

  constructor(
    id: number,
    studentId: number,
    classroomId: number,
    grade: number,
  ) {
    this.id = id;
    this.studentId = studentId;
    this.classroomId = classroomId;
    this.grade = grade;
  }
}

export default Grade;
