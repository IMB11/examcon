import { resolve } from "path";
import { Question } from "./question";
import { readdirSync } from "fs";

export interface QuestionDefinition {
  name: string;
  id: string;
  questions: Question[];
}

export interface Topic {
  id: string;
  name: string;
  questionDefinitions: QuestionDefinition[];
}

export interface Subject {
  id: string;
  name: string;
  topics: Topic[];
}

let topicID = 0;
let questionDefinitionID = 0;
let subjectID = 0;

export function loadSubjects(rootQuestionFolder: string): Subject[] {
  const subjects = readdirSync(rootQuestionFolder);

  const loadedSubjects: Subject[] = [];

  subjects.forEach((subject) => {
    // Get topic folders.
    const topics = readdirSync(resolve(rootQuestionFolder, subject));
    const loadedTopics: Topic[] = [];

    topics.forEach(topic => {
      // load topic.json inside topic folder.
      const topicJson = require(resolve(rootQuestionFolder, subject, topic, "topic.json"));
      // load any question definitions inside topic folder, json files that arent topic.json.
      const questionDefinitionFiles = readdirSync(resolve(rootQuestionFolder, subject, topic))
        .filter(file => file.endsWith(".json") && file !== "topic.json");

      const questionDefinitions: QuestionDefinition[] = [];

      questionDefinitionFiles.forEach(questionDefinitionFile => {
        const questionDefinitionJson = require(resolve(rootQuestionFolder, subject, topic, questionDefinitionFile));

        questionDefinitions.push({
          name: questionDefinitionJson.name,
          id: (questionDefinitionID++).toString(),
          questions: questionDefinitionJson.questions
        });
      });

      loadedTopics.push({
        id: (topicID++).toString(),
        name: topicJson.name,
        questionDefinitions
      });
    });

    // remove _, capitalize first letter of each word.
    // "computer_science" -> "Computer Science"
    const readableName = subject.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    loadedSubjects.push({
      id: (subjectID++).toString(),
      name: readableName,
      topics: loadedTopics
    });
  });

  return loadedSubjects;
}