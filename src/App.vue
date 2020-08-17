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
body {
  margin: 0;
  padding: 0;
  background: lightgray;
}

.container {
  width: 600px;
  margin: auto;
}
</style>
