<template>
  <div class="container">
    <header>
      <h1>Comment List Demo</h1>
      <User />
    </header>
    <List/>
  </div>
</template>

<script>
import List from './components/List.vue';
import User from './components/User.vue';

export default {
  name: 'App',
  components: {
    List,
    User,
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap);

body {
  font-family: 'Roboto', serif;
  margin: 0;
  padding: 0;
  background: lightgray;
}

header {
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
}

.container {
  width: 600px;
  margin: auto;
}
</style>
