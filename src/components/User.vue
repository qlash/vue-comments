<template>
  <section class="current-user">
    <template v-if="current">
      <img
        class="current-user__avatar"
        :src="current.avatar"
      />
      <strong>{{ current.first_name }} {{ current.last_name }}</strong>
    </template>
    <Loader v-else />
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('Users', ['current']),
  },
  async beforeMount() {
    await this.$store.dispatch('Users/getList');
    this.$store.commit('Users/setCurrent');
  },
};
</script>

<style lang="scss" scoped>
.current-user {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: .7rem;

  &__avatar {
    max-width: 50px;
    height: auto;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
