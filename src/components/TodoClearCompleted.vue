<template>
  <button v-if="showClearFinishedButton" @click="clearFinished">Delete finished</button>
</template>

<script>
export default {
  name: "todo-clear-completed",
  computed: {
    showClearFinishedButton() {
      return this.$store.getters.showClearCompletedButton;
    },
  },
  methods: {
    clearFinished() {
      this.$confirm("Delete all completed tasks ?", "", "question").then(() => {
        this.$alert("You just deleted all completed tasks", "", "success");
        this.$store.dispatch("clearCompleted");
      });
    },
  },
};
</script>

