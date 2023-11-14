import { resolve } from "path";
import { loadSubjects } from "./types/subjects";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getQuestions } from "./types/utils";

// Load questions from ../questions/{subject}/{topic} folders.
const loadedSubjects = loadSubjects(resolve("questions"));

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/subjects", (req, res) => {
  res.json(loadedSubjects);
});

// app.get("/subject/:id", (req, res) => {
//   const subject = loadedSubjects.find(subject => subject.id === req.params.id);

//   if (!subject) {
//     res.status(404).send("Subject not found");
//     return;
//   }

//   res.json(subject);
// });

// app.get("/subject/:subjectId/topic/:topicId", (req, res) => {
//   const subject = loadedSubjects.find(subject => subject.id === req.params.subjectId);

//   if (!subject) {
//     res.status(404).send("Subject not found");
//     return;
//   }

//   const topic = subject.topics.find(topic => topic.id === req.params.topicId);

//   if (!topic) {
//     console.log("Topic not found")
//     res.status(404).send("Topic not found");
//     return;
//   }

//   console.log(topic);

//   res.json(topic);
// });

// app.get(`/subject/:subjectId/topic/:topicId/subTopic/:subTopicId`, (req, res) => {
//   console.log(req.params);
//   const subject = loadedSubjects.find(subject => subject.id === req.params.subjectId);

//   if (!subject) {
//     res.status(404).send("Subject not found");
//     return;
//   }

//   const topic = subject.topics.find(topic => topic.id === req.params.topicId);

//   if (!topic) {
//     res.status(404).send("Topic not found");
//     return;
//   }

//   const questionDefinition = topic.questionDefinitions.find(questionDefinition => questionDefinition.id === req.params.subTopicId);

//   if (!questionDefinition) {
//     res.status(404).send("Subtopic not found");
//     return;
//   }

//   res.json(questionDefinition);
// });

app.get("/v2/subject/:subjectID", (req, res) => {
  const subject = loadedSubjects.find(subject => subject.id === req.params.subjectID);

  if (!subject) {
    res.status(404).send("Subject not found");
    return;
  }

  res.json(subject);
});

app.get("/v2/topic/:topicID", (req, res) => {
  const topic = loadedSubjects.flatMap(subject => subject.topics).find(topic => topic.id === req.params.topicID);
  const topicSubject = loadedSubjects.find(subject => subject.topics.find(topic => topic.id === req.params.topicID));

  if (!topic) {
    res.status(404).send("Topic not found");
    return;
  }

  const questions = topic.questionDefinitions.flatMap(questionDefinition => getQuestions(questionDefinition));

  res.json({
    subject: topicSubject,
    topic: topic,
    questions
  });
});

app.get("/v2/subtopic/:subTopicID", (req, res) => {
  const subTopic = loadedSubjects.flatMap(subject => subject.topics).flatMap(topic => topic.questionDefinitions).find(subTopic => subTopic.id === req.params.subTopicID);
  const topic = loadedSubjects.flatMap(subject => subject.topics).find(topic => topic.questionDefinitions.find(subTopic => subTopic.id === req.params.subTopicID));
  const topicSubject = loadedSubjects.find(subject => subject.topics.find(topic => topic.questionDefinitions.find(subTopic => subTopic.id === req.params.subTopicID)));

  if (!subTopic) {
    res.status(404).send("Subtopic not found");
    return;
  }

  if (!topic) {
    res.status(404).send("Topic not found");
    return;
  }

  if (!topicSubject) {
    res.status(404).send("Subject not found");
    return;
  }

  const questions = getQuestions(subTopic);

  res.json({
    subject: topicSubject,
    topic: topic,
    subTopic: subTopic,
    questions
  });
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});

