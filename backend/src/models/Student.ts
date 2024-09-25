export interface StudentInterface {
    id: number;
    name: string;
    image_url: string;
}

class Student implements StudentInterface {
    id: number;
    name: string;
    image_url: string;

    constructor(id: number, name: string, image_url: string) {
        this.id = id;
        this.name = name;
        this.image_url = image_url;
    }
}

export default Student;