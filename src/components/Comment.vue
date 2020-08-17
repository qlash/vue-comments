<template>
  <article class="comment">
    <div class="comment__avatar">
      <img class="comment__avatar__img" :src="comment.avatar" :alt="author" />
    </div>
    <div class="comment__body">
      <p>
        <strong>{{ author }}:</strong>
        {{ comment.text }}
      </p>
      <p class="comment__body--date">{{ comment.created_at | fromNow }}</p>
    </div>
  </article>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    comment: Object,
  },
  computed: {
    author() {
      return `${this.comment.first_name} ${this.comment.last_name}`;
    },
  },
  filters: {
    fromNow(date) {
      return moment(date).fromNow();
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;

  &__avatar {
    padding: 2rem 0 2rem 2rem;
    flex: 0 1 20%;

    &__img {
      max-width: 100%;
      height: auto;
      border-radius: 50%;
      overflow: hidden;
    }
  }

  &__body {
    padding: 2rem;
    flex: 0 1 80%;
    word-break: break-all;

    P {
      margin: 0 0 1rem 0;
    }

    &--date {
      color: gray;
    }
  }
}
</style>
