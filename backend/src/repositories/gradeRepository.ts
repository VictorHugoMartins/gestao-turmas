import Grade from "../models/Grade";
import { readJsonFile, writeJsonFile } from "../utils/readFiles";

export const getStudentViews = () => readJsonFile("./data/grades.json") || [];

export const saveStudentViews = (grades: Grade[]) =>
  writeJsonFile("./data/grades.json", grades);

module.exports = { getStudentViews, saveStudentViews };
