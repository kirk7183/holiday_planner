<template>
  <div>
    <div
      v-show="show"
      class="message"
      :style="{color: messageGetters.sendMessageColor}"
    >{{messageGetters.sendMessage}}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      show: true,
    };
  },
  computed: {
    ...mapGetters({ messageGetters: "messageGetters" }),
  },
};
</script>

<style>
</style>