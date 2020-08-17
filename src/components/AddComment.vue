<template>
  <div>
    <textarea v-model="comment" />
    <button @click="add" />
  </div>
</template>

<script>
export default {
  data: () => ({
    comment: '',
  }),
  methods: {
    add() {
      this.$emit('add', this.comment);
    },
  },
};
</script>
