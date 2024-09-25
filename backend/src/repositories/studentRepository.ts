import Student from "../models/Student";
import { readJsonFile, writeJsonFile } from "../utils/readFiles";

export const getStudents = () => readJsonFile('./data/students.json') || [];

export const saveStudents = (students: Student[]) => writeJsonFile('./data/students.json', students);

module.exports = { getStudents, saveStudents };