<template>
  <div>
    <UserAt
      ref="userAt"
      :userAt.sync="userAt"
      @selected="insert"
    />
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
            @keydown="keydown"
            @keyup="check"
            @blur="blur"
          />
          <hr/>
          <div>
            <span
              v-for="icon in emoji"
              :key="icon"
              @click="insertAt(icon)"
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import UserAt from './UserAt.vue';

export default {
  components: {
    UserAt,
  },
  data: () => ({
    loading: false,
    emoji: ['😀', '😃', '😄', '😁', '😆', '😅'],
    comment: '',
    userAt: '',
  }),
  computed: {
    ...mapState('Users', ['current']),
  },
  methods: {
    insert(txt) {
      this.insertAt(txt, this.userAt.length);
      this.userAt = '';
    },
    insertAt(txt, start = 0) {
      const startPos = this.$refs.comment.selectionStart - start;
      const endPos = this.$refs.comment.selectionEnd;
      this.comment = this.comment.substring(0, startPos)
       + txt
       + this.comment.substring(endPos, this.comment.length);
      this.$refs.comment.focus();
    },
    check() {
      const endPos = this.$refs.comment.selectionEnd;
      let endPosText = this.comment.indexOf(' ', endPos);
      if (endPosText === -1) endPosText = this.comment.length;
      const result = /\S+$/.exec(this.comment.slice(0, endPos));
      let lastWord = result ? result[0] : null;
      if (lastWord) lastWord = lastWord.replace(/[\W]$/, '');
      if (lastWord?.length > 1 && lastWord[0] === '@') {
        this.userAt = lastWord.substr(1);
      } else {
        this.userAt = '';
      }
    },
    keydown(key) {
      if (this.userAt && (key.keyCode === 38 || key.keyCode === 40 || key.keyCode === 13)) {
        this.$refs.userAt.keyCode(key.keyCode);
        key.preventDefault();
      }
    },
    blur() {
      setTimeout(() => { this.userAt = ''; }, 300);
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
