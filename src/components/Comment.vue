<template>
  <article class="comment">
    <div class="comment__avatar">
      <img class="comment__avatar__img" :src="comment.avatar" :alt="author" />
    </div>
    <div class="comment__body">
      <p>
        <strong>{{ author }}: </strong>
        <span v-html="userAt(comment.text)" />
      </p>
      <p class="comment__body--date">{{ comment.created_at | fromNow }}</p>
    </div>
  </article>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  props: {
    comment: Object,
  },
  computed: {
    ...mapState('Users', ['list']),
    author() {
      return `${this.comment.first_name} ${this.comment.last_name}`;
    },
  },
  data: () => ({
    interval: null,
  }),
  filters: {
    fromNow(date) {
      return moment(date).fromNow();
    },
  },
  methods: {
    userAt(text) {
      if (!this.list || this.list.length) return text;
      let replaced = text;
      this.list.forEach((user) => {
        replaced = replaced.replace(
          `@${user.first_name} ${user.last_name}`,
          `<a href="#">${user.first_name} ${user.last_name}</a>`,
        );
      });
      return replaced;
    },
  },
  created() {
    this.interval = setInterval(() => this.$forceUpdate(), 1000);
  },
  destroyed() {
    clearInterval(this.interval);
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
