<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <div class="image">
        <h2 class="username">Built by Calum H.</h2>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  border-top-right-radius: var(--gap-xl);
  border-top-left-radius: var(--gap-xl);
  text-align: center;
  background-color: var(--color-raised-bg);
  color: var(--color-base);
  padding: 3rem;
  margin-top: 5rem;
  margin-bottom: 0rem;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.link-rows {
  display: flex;
  flex-direction: row;
  gap: var(--gap-xl);
  justify-content: space-evenly;
  margin-top: var(--gap-xl);

  // Align all link rows together.
  .link-row {
    display: flex;
    flex-direction: column;

    a {
      color: var(--color-brand);
    }
  }
}

.image {
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: var(--gap-md);

  .username {
    margin-top: auto;
    margin-bottom: auto;
  }
}
</style>
