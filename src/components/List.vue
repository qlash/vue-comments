<template>
  <section class="section__list">
    <Loader v-if="!list" />
    <template
      v-else
      v-for="comment in list"
    >
      <Comment
        :key="comment.id"
        :comment="comment"
       />
    </template>
    <AddComment />
  </section>
</template>

<script>
import { mapState } from 'vuex';
import AddComment from './AddComment.vue';
import Comment from './Comment.vue';

export default {
  components: {
    AddComment,
    Comment,
  },
  computed: {
    ...mapState('Comments', ['list']),
  },
  mounted() {
    this.$store.dispatch('Comments/get');
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
