<template>
  <div class="container">
    <List/>
  </div>
</template>

<script>
import List from './components/List.vue';

export default {
  name: 'App',
  components: {
    List,
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

.container {
  width: 600px;
  margin: auto;
}
</style>
