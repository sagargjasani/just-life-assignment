<template>
  <div class="app-layout">
    <AppNavbar />
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  max-width: var(--size-container-max);
  margin: 0 auto;
  width: 100%;
  padding: var(--space-xl) var(--space-md);

  @media (max-width: 48rem) {
    padding: var(--space-lg) var(--space-md);
  }
}
</style>
