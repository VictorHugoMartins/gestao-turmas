export interface StudentInterface {
  id: number;
  name: string;
  image_url: string;
  frequency: number;
}

class Student implements StudentInterface {
  id: number;
  name: string;
  image_url: string;
  frequency: number;

  constructor(id: number, name: string, image_url: string, frequency: number) {
    this.id = id;
    this.name = name;
    this.image_url = image_url;
    this.frequency = frequency;
  }
}

export default Student;
