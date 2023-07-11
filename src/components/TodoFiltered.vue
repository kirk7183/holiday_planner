<template>
  <div class="todo-filtered-style">
    <button :class="{ active: filter == 'all' }" @click="changeFilter('all')">
      All
    </button>
    <button
      :class="{ active: filter == 'active' }"
      @click="changeFilter('active')"
    >
      Pending
    </button>
    <button
      id="btn-complete"
      :class="{ active: filter == 'completed' }"
      @click="changeFilter('completed')"
    >
      Done
    </button>
  </div>
</template>

<script>
export default {
  name: "todo-filtered",
  computed: {
    filter() {
      return this.$store.state.filter;
    },
  },
  methods: {
    changeFilter(filter) {
      this.$store.dispatch("updateFilter", filter);
    },
  },
};
</script>
<style >
.todo-filtered-style {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-wrap: wrap;
  flex: 1 1 auto;
}
button {
  margin-right: 5px;
}

@media screen and (max-width: 430px) {
  .todo-filtered-style {
    justify-content: center;
  }

  /* #btn-complete {
    flex-basis: 100%;
  } */
  .todo-clear-completed-style {
    width: 98%;
  }
}
</style>

