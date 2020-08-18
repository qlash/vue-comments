<template>
  <ul class="user-list">
    <li
      v-for="(user, index) in userList"
      :key="user.id"
      :class="{ active: index === selected }"
      @mouseover="selected = index"
      @click="emitUser(user)"
    >
      <img :src="user.avatar" />
      <span>{{ user.first_name }} {{ user.last_name }}</span>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    userAt: String,
  },
  computed: {
    userList() {
      let list = [];
      if (this.userAt) {
        list = this.list.filter(
          (user) => user.first_name.toLowerCase().startsWith(this.userAt.toLowerCase()),
        );
      }
      return list;
    },
    ...mapState('Users', ['list']),
  },
  data: () => ({
    selected: 0,
  }),
  methods: {
    keyCode(key) {
      switch (key) {
        case 38:
          this.selected -= 1;
          if (this.selected < 0) this.selected = 0;
          break;
        case 40:
          this.selected += 1;
          if (this.selected >= this.userList.length) this.selected = this.userList.length - 1;
          break;
        case 13:
          this.emitUser(this.userList[this.selected]);
      }
    },
    emitUser(user) {
      this.$emit('selected', `${user.first_name} ${user.last_name}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.user-list {
  margin: 2px 20px;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    align-items: center;

    &.active {
      background: lightskyblue;
    }
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
    margin-bottom: 5px;
  }
}
</style>
