<script setup>
const { subTopics, topic, subject } = defineProps([
  "subTopics",
  "topic",
  "subject",
]);
</script>

<template>
  <div class="topic-list">
    <ul class="topic-links">
      <li v-for="subTopic in subTopics">
        <NuxtLink :to="`/questions/${subTopic.id}`">{{
          subTopic.name
        }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
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
