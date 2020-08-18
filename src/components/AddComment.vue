<template>
  <div class="comment-add">
    <template v-if="current">
      <img
        class="comment-add__avatar"
        :src="current.avatar"
      />
      <div class="comment-add__body">
        <textarea
          ref="comment"
          v-model.trim="comment"
          :disabled="loading"
          placeholder="Add a comment"
        />
        <hr/>
        <div>
          <span
            v-for="icon in emoji"
            :key="icon"
            @click="addEmoji(icon)"
            >
              {{ icon }}
            </span>
        </div>
      </div>
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
    emoji: ['😀', '😃', '😄', '😁', '😆', '😅'],
    comment: '',
  }),
  computed: {
    ...mapState('Users', ['current']),
  },
  methods: {
    addEmoji(icon) {
      const startPos = this.$refs.comment.selectionStart;
      const endPos = this.$refs.comment.selectionEnd;
      this.comment = this.comment.substring(0, startPos)
       + icon
       + this.comment.substring(endPos, this.comment.length);
    },
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
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
  }

  &__body {
    margin: 0 .5rem;
    flex: 1 1 auto;

    textarea {
      width: 100%;
      border: 0;
      outline: 0;
      resize: none;

      &:focus {
        border: 0;
        outline: 0;
      }
    }
  }

  button {
    background: white;
    border: 0;
    outline: 0;
  }

}
</style>
