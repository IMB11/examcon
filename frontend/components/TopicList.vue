<script setup>
import { Card, Button } from "omorphia";
const { topics, subject } = defineProps(["topics", "subject"]);
console.log(topics);
</script>

<template>
  <div class="topic-list">
    <Card v-for="topic in topics">
      <h3>{{ topic.name }}</h3>
      <ul class="topic-links">
        <li v-for="subtopic in topic.questionDefinitions">
          <NuxtLink :to="`/questions/` + subtopic.id">{{
            subtopic.name
          }}</NuxtLink>
        </li>
      </ul>
      <hr class="card-divider" />
      <div class="btn-group">
        <Button @click="navigateTo('/topic/' + topic.id)"
          >View all Questions</Button
        >
      </div>
    </Card>
  </div>
</template>

<style scoped lang="scss">
.btn-group {
  margin-top: var(--gap-md);
}

.topic-list {
  // Grid of cards.
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--gap-xl);
  justify-content: center;
  align-items: center;
  width: 100%;
}

.topic-links {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
  margin-top: var(--gap-md);
  // add point
  li {
    list-style-type: disc;
    margin-left: var(--gap-md);
  }
}

.topic-links > li > a {
  color: var(--color-brand);
  font-weight: 700;
}
</style>
