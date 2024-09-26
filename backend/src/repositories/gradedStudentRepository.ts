import Grade from "../models/Grade";
import { readJsonFile, writeJsonFile } from "../utils/readFiles";

export const getGradedStudents = () => readJsonFile('./data/gradedStudents.json') || [];

export const saveGradedStudents = (grades: Grade[]) => writeJsonFile('./data/gradedStudents.json', grades);

module.exports = { getGradedStudents, saveGradedStudents };
