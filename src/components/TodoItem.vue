<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed" @change="doneEdit" />
      <div
        v-if="!editing"
        @dblclick="editTodo"
        class="todo-item-label"
        :class="[{ completed: completed }, { notCompleted: !completed }]"
      >
        {{ byWho }} - {{ title }}
        <!-- <i class="fas fa-question-circle"></i> -->
        <button v-if="info" class="info" @click="alert()">?</button>
      </div>
      <input
        v-else
        class="todo-item-edit"
        type="text"
        v-model="title"
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        v-focus
      />
    </div>
    <!-- end todo-item-left -->
    <div>
      <span class="remove-item" @click="removeTodo(todo.id)">&times;</span>
    </div>
  </div>
  <!-- end todo-item -->
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true,
    },
    checkAll: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      byWho: this.todo.byWho,
      info: this.todo.info,
      completed: this.todo.completed,
      timestamp: this.todo.timestamp,
      editing: this.todo.editing,
      beforeEditCache: "",
    };
  },

  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed;
    },
    todo() {
      this.title = this.todo.title;
      this.completed = this.todo.completed;
    },
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
  methods: {
    removeTodo(id) {
      this.$confirm("Delete task ?", "", "question").then(() => {
        this.$alert("You just deleted task", "", "success");
        this.$store.dispatch("deleteTodo", id);
      });
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEdit() {
      if (this.title.trim() == "") {
        this.title = this.beforeEditCache;
      }
      this.editing = false;
      this.$store.dispatch("updateTodo", {
        id: this.id,
        title: this.title,
        byWho: this.byWho,
        info: this.info,
        completed: this.completed,
        timestamp: this.timestamp,
        editing: this.editing,
      });
    },
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    },
    alert() {
      if (this.info == "" || this.info == undefined) {
        this.$alert("You didn`t write any INFO !", "", "info");
      } else {
        this.$alert(this.info, "", "info");
      }
    },
  },
};
</script>

