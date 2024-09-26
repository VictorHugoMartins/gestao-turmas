export interface ClassroomInterface {
  id: number;
  name: string;
}

class Classroom implements ClassroomInterface {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export default Classroom;
