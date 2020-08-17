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
    <AddComment @add="add" />
  </section>
</template>

<script>
import AddComment from './AddComment.vue';
import Comment from './Comment.vue';

export default {
  components: {
    AddComment,
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
    add(comment) {
      console.log(comment);
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
