export interface Student {
  id?: number;
  image_url: string;
  name: string;
  frequency?: number;
}

export interface Subject {
  id?: number;
  name: string;
}

export interface StudentView {
  id?: number;
  studentId: number;
  subjectId: number;
  subjectName: string;
  name: string;
  grade: number;
  image_url: string;
  frequency: number;
}
