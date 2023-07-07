<template>
  <div>
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
button {
  margin-right: 5px;
}
</style>

