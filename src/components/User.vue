<template>
  <section class="current-user">
    <img
      class="current-user__avatar"
      :src="user.avatar"
    />
    <strong>{{ user.first_name }} {{ user.last_name }}</strong>
  </section>
</template>

<script>
export default {
  data: () => ({
    user: {},
  }),
  async beforeMount() {
    const res = await fetch('https://my-json-server.typicode.com/zaszczyk/demo/users');
    const users = await res.json();
    const randomUser = users[Math.floor(Math.random() * users.length)];
    localStorage.setItem('user-list', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(randomUser));

    this.user = randomUser;
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
