<template>
  <div class="comment-add">
    <template v-if="current">
      <img
        class="comment-add__avatar"
        :src="current.avatar"
      />
      <textarea
        v-model.trim="comment"
        :disabled="loading"
        class="comment-add__body"
        placeholder="Add a comment"
      />
      <button
        :disabled="loading"
        class="comment-add__btn"
        @click="add({ comment })"
      >
        Comment
      </button>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    loading: false,
    comment: '',
  }),
  computed: {
    ...mapState('Users', ['current']),
  },
  methods: {
    async add() {
      if (this.comment) {
        this.loading = true;
        await this.$store.dispatch('Comments/add', { comment: this.comment });
        this.comment = '';
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-add {
  display: flex;
  padding: 1rem;

  &__avatar {
    max-width: 50px;
    height: auto;
    border-radius: 50%;
    overflow: hidden;
  }

  &__body {
    margin: 0 .5rem;
    flex: 1 1 auto;
    border: 0;
    outline: 0;
    resize: none;

    &:focus {
      border: 0;
      outline: 0;
    }
  }

  button {
    background: white;
    border: 0;
    outline: 0;
  }

}
</style>
