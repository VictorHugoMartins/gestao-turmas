import GradedStudent from "../models/GradedStudent";
import { readJsonFile, writeJsonFile } from "../utils/readFiles";

export const getGradedStudents = () => readJsonFile('./data/gradedStudents.json') || [];

export const saveGradedStudents = (grades: GradedStudent[]) => writeJsonFile('./data/gradedStudents.json', grades);

module.exports = { getGradedStudents, saveGradedStudents };
