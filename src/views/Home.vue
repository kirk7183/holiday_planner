<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/holiday_planner.png" class="logo" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
<style scoped>
.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}
</style>
