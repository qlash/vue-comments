<template>
  <section class="section__list">
    <Loader v-if="!loaded" />
    <template v-else>
      <div v-for="comment in list" :key="comment.id">
        {{ comment }}
      </div>
    </template>
  </section>
</template>

<script>
export default {
  data: () => ({
    loaded: false,
    list: [],
  }),
  methods: {
    async get() {
      const res = await fetch('https://my-json-server.typicode.com/zaszczyk/demo/comments');
      this.list = await res.json();
      this.loaded = true;
    },
  },
  mounted() {
    this.get();
  },
};
</script>

<style lang="scss" scoped>
.section {
  &__list {
    background: white;
    margin: 5rem 0;
    padding: 2rem;
  }
}
</style>
