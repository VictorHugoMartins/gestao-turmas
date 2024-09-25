export interface GradedStudentInterface {
    id: number;
    studentId: number;
    classroomId: number;
    grade: number;
    frequency: number;
}

class GradedStudent implements GradedStudentInterface {
    id: number;
    studentId: number;
    classroomId: number;
    grade: number;
    frequency: number;

    constructor(id: number, studentId: number, classroomId: number, grade: number, frequency: number) {
        this.id = id;
        this.studentId = studentId;
        this.classroomId = classroomId;
        this.grade = grade;
        this.frequency = frequency;
    }
}

export default GradedStudent;
