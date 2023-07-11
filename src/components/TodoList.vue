<template>
  <div>
    <!-- import components -->
    <Logout />
    <Message />

    <input
      v-focus
      type="text"
      id="focusHere"
      ref="focusHere"
      class="todo-input"
      placeholder="What to do / buy"
      v-model="newTodo"
      @keyup.enter="addTodo()"
    />

    <input
      type="text"
      class="todo-input"
      placeholder="Who"
      v-model="byWho"
      @keyup.enter="addTodo"
    />
    <input
      type="text"
      class="todo-input"
      placeholder="Info"
      v-model="info"
      @keyup.enter="addTodo()"
    />
    <button class="button-add" @click="addTodo">Add</button>
    <!-- animation circle-->
    <div v-if="$store.state.loading" class="lds-ring">
      <div class="need for animation 1"></div>
      <div class="need for animation 2"></div>
      <div class="need for animation 3"></div>
      <div class="need for animation 4"></div>
    </div>

    <transition-group
      name="fade"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <!--import components-->
      <todo-item
        v-for="todo in todosFiltered"
        :key="todo.id"
        :todo="todo"
        :checkAll="!anyRemaining"
      ></todo-item>
    </transition-group>
    <div class="grouping">
      <div class="extra-container1">
        <!--import components-->
        <todo-check-all></todo-check-all>
        <todo-items-remaining></todo-items-remaining>
      </div>
      <!-- end extra-container -->

      <div class="extra-container2">
        <!--import components dugme ALL, NOT FINISHED, FINISHED-->
        <todo-filtered></todo-filtered>

        <div class="todo-clear-complete-style">
          <transition name="fade">
            <!--import components-->
            <todo-clear-completed></todo-clear-completed>
          </transition>
        </div>
      </div>
      <!-- end extra-container -->
    </div>
  </div>
</template>

<script>
import Message from "./addOns/Message.vue";
import Logout from "./auth/Logout.vue";
import TodoItem from "./TodoItem";
import TodoItemsRemaining from "./TodoItemsRemaining";
import TodoCheckAll from "./TodoCheckAll";
import TodoFiltered from "./TodoFiltered";
import TodoClearCompleted from "./TodoClearCompleted";

export default {
  name: "todo-list",
  components: {
    Message,
    Logout,
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFiltered,
    TodoClearCompleted,
  },
  data() {
    return {
      newTodo: "",
      byWho: "",
      info: "",
      idForTodo: 3,
    };
  },

  created() {
    this.$store.dispatch("initRealtimeListeners");
    this.$store.dispatch("retrieveTodos");
    this.$store.dispatch("message", {
      sendMessage: "",
      sendMessageColor: "blue",
    });
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    },
    todosFiltered() {
      return this.$store.getters.todosFiltered;
    },
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0 || this.byWho.trim().length == 0) {
        this.$store.dispatch("message", {
          sendMessage: "You must fill empty field !!!",
          sendMessageColor: "red",
        });
        return;
      }

      this.$store.dispatch("addTodo", {
        id: this.idForTodo,
        title: this.newTodo,
        byWho: this.byWho,
        info: this.info,
      });

      this.newTodo = "";
      this.byWho = "";
      this.info = "";
      this.idForTodo++;
      this.$refs.focusHere.focus();
    },
  },
};
</script>

<style lang="scss" >
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap");

body {
  background-color: #f5f5f5;
  font-family: "Poppins", sans-serif;
}
input[type="checkbox"]:hover {
  cursor: pointer;
}
.todo-input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #333;
}
.todo-input:not(:first-of-type) {
  margin-top: 10px;
}
.todo-input::placeholder {
  color: #999;
}

button {
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}
button.button-add {
  width: 150px;
  margin: 15px 0 30px;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

button:focus {
  outline: none;
}
button :last-of-type {
  margin-right: 0;
}

.lds-ring {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  width: 64px;
  height: 64px;
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid #4caf50;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #4caf50 transparent transparent transparent;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.todo-item-left {
  display: flex;
}
.todo-item-label {
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-left: 10px;
  font-size: 16px;
  color: #333;
  text-align: left;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.notCompleted {
  color: #f44336;
}

.extra-container1,
.extra-container2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;

  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.extra-container1 {
  // position: sticky;
  bottom: 38px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.extra-container2 {
  padding: 0 12px 16px;
  // position: sticky;
  bottom: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.info {
  margin-left: 10px;
  border-radius: 50px;
}
.info {
  width: 24px;
  height: 24px;
  background-color: #4a90e2;
  color: white;
  font-size: 12px;
  border: none;
  cursor: pointer;
  margin: 0 10px;
  padding: 0px;
}

@media screen and (max-width: 430px) {
  .extra-container2 {
    display: block;
  }
}
</style>
