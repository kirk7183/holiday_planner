<template>
  <button
    class="todo-clear-completed-style"
    v-if="showClearFinishedButton"
    @click="clearFinished"
  >
    Delete Done
  </button>
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

<style>
.todo-clear-completed-style {
  background: #dc3545;
}
button {
  margin: 16px 5px 0;
  flex: 1 1;
}
</style>