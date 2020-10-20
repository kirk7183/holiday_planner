<template>
  <div style="text-align: center;">
    <p style="margin:0; font-size:18px">Plan name:</p>
    <p style="margin:7px; font-size: 25px;">{{planName}}</p>
    <button style="margin-bottom: 20px" @click="Logout">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    planName() {
      return this.$store.getters.planName;
    },
  },
  methods: {
    Logout() {
      this.$store.dispatch("Logout");
    },
  },
};
</script>

<style>
</style>