<template>
  <div class="container logout">
    <p class="plan-label">
      Plan name: <span class="plan-name">{{ planName }}</span>
    </p>
    <!-- <p class="plan-name">{{ planName }}</p> -->
    <button class="logout-button" @click="Logout">Logout</button>
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
.container {
  text-align: center;
}

.plan-label {
  margin: 0;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.plan-name {
  margin: 7px;
  font-size: 22px;
}

.logout-button {
  margin-bottom: 25px;
  margin-top: 5px;
  width: 150px;
  padding: 10px;
  border: none;
  background-color: #333;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.logout-button:hover {
  background-color: #4a90e2;
}
</style>