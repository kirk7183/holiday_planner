<template>
  <div>
    <label>
      <input type="checkbox" :checked="!anyRemaining" @click.prevent="allChecked" /> Check All
    </label>
  </div>
</template>

<script>
export default {
  name: "todo-check-all",
  data() {
    return {};
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    },
  },
  methods: {
    allChecked() {
      this.$store.dispatch("checkAll", event.target.checked);
    },
  },
};
</script>

