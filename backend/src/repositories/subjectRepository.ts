import Subject from "../models/Subject";
import { readJsonFile, writeJsonFile } from "../utils/readFiles";

export const getSubjects = () => readJsonFile("./data/subjects.json") || [];

export const saveSubjects = (subjects: Subject[]) =>
  writeJsonFile("./data/subjects.json", subjects);

module.exports = { getSubjects, saveSubjects };
