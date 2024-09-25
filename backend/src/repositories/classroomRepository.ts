import Classroom from "../models/Classroom";
import { readJsonFile, writeJsonFile } from "../utils/readFiles";

export const getClassrooms = () => readJsonFile('./data/classrooms.json') || [];

export const saveClassrooms = (classrooms: Classroom[]) => writeJsonFile('./data/classrooms.json', classrooms);

module.exports = { getClassrooms, saveClassrooms };
