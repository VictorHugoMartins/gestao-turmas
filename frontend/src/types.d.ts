export interface Student {
    id?: number;
    image_url: string;
    name: string;
    frequency?: number;
}

export interface Classroom {
    id?: number;
    name: string;
}

export interface StudentView {
    id?: number;
    studentId: number;
    classroomId: number;
    classroomName: string;
    name: string;
    grade: number;
    image_url: string;
    frequency: number;
}