export interface SubjectInterface {
  id: number;
  name: string;
}

class Subject implements SubjectInterface {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export default Subject;
