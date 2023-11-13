<template>
  <!-- /:subject_id -->
  <div class="subject-list">
    <div class="header">
      <h1 class="title">{{ result.topic.name }}</h1>
      <p class="subtitle">
        This topic has {{ allQuestions.length }} questions.
      </p>
    </div>
    <ExamQuestionViewer :questions="allQuestions" />
    <div class="header">
      <h2 class="title">Want to go more in-depth?</h2>
      <SubTopicList
        class="topic-list"
        :subTopics="result.topic.questionDefinitions"
        :topic="result.topic"
        :subject="result.subject"
      ></SubTopicList>
    </div>
  </div>
</template>

<script setup>
import { randomizeQuestionArray } from "../utils";
import { Card } from "omorphia";

const route = useRoute();
console.log(route.params);
const topic_id = route.params.topic_id;

const result = await (
  await fetch("http://localhost:3001/v2/topic/" + topic_id)
).json();

const allQuestions = randomizeQuestionArray(
  result.topic.questionDefinitions.map((def) => def.questions).flat()
);
</script>

<style scoped lang="scss">
.subtitle {
  font-size: 1.2rem;
}
</style>
