<template>
  <!-- /:subject_id -->
  <div class="subject-list">
    <div class="header">
      <h1 class="title">{{ result.subTopic.name }}</h1>
      <p class="subtitle">
        This topic has {{ allQuestions.length }} questions.
      </p>
    </div>
    <ExamQuestionViewer :questions="allQuestions" />
  </div>
</template>

<script setup>
import { randomizeQuestionArray } from "../utils";

const route = useRoute();
console.log(route.params);
const subtopic_id = route.params.subtopic_id;

const result = await (
  await fetch("https://zany-guacamole-qgjxgvrq7rq2955j-3001.app.github.dev/v2/subtopic/" + subtopic_id)
).json();

console.log(result);

const allQuestions = randomizeQuestionArray(result.questions);
</script>

<style scoped lang="scss">
.subtitle {
  font-size: 1.2rem;
}
</style>
