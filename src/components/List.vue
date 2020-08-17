<template>
  <section class="section__list">
    <Loader v-if="!loaded" />
    <template
      v-else
      v-for="comment in list"
    >
      <Comment
        :key="comment.id"
        :comment="comment"
       />
    </template>
  </section>
</template>

<script>
import Comment from './Comment.vue';

export default {
  components: {
    Comment,
  },
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
  }
}
</style>
