<script setup>
import { Card } from "omorphia";

const subjects = await (await fetch("https://zany-guacamole-qgjxgvrq7rq2955j-3001.app.github.dev/subjects")).json();

console.log(subjects);
</script>

<template>
  <!-- <div class="hero">
    <h1>ExamCon</h1>
  </div> -->
  <div class="subject-list">
    <div v-for="subject in subjects">
      <h2>{{ subject.name }}</h2>
      <TopicList
        class="topic-list"
        :topics="subject.topics ?? []"
        :subject="subject"
      ></TopicList>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--gap-xl);
  margin-top: var(--gap-xl);
  margin-bottom: var(--gap-xl);

  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: var(--gap-md);
  }
}
</style>
