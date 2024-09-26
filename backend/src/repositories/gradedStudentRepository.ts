import Grade from "../models/Grade";
import { readJsonFile, writeJsonFile } from "../utils/readFiles";

export const getGradedStudents = () => readJsonFile('./data/grades.json') || [];

export const saveGradedStudents = (grades: Grade[]) => writeJsonFile('./data/grades.json', grades);

module.exports = { getGradedStudents, saveGradedStudents };
