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
    <button @click="addTodo">Add</button>
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

    <div class="extra-container1">
      <!--import components-->
      <todo-check-all></todo-check-all>
      <todo-items-remaining></todo-items-remaining>
    </div>
    <!-- end extra-container -->

    <div class="extra-container2">
      <!--import components dugme ALL, NOT FINISHED, FINISHED-->
      <todo-filtered></todo-filtered>

      <div>
        <transition name="fade">
          <!--import components-->
          <todo-clear-completed></todo-clear-completed>
        </transition>
      </div>
    </div>
    <!-- end extra-container -->
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

input[type="text"] {
  font-size: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
}
input[type="password"] {
  font-size: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.message {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  animation-duration: 0.3s;
}
.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;

  // &:focus {
  // outline: 0;
  //
  // }
}

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc; //override defaults
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  &:focus {
    outline: none;
  }
}

.completed {
  text-decoration: line-through;
  color: grey;
}
.notCompleted {
  color: red;
}

.extra-container1 {
  position: sticky;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // width: 100%;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
  bottom: 38px;
}
.extra-container2 {
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
  bottom: 0;
  position: sticky;
}

button {
  font-size: 14px;
  background-color: white;
  appearance: none;

  &:hover {
    background: lightgray;
  }

  &:focus {
    outline: none;
  }
}

.active {
  background: rgb(119, 137, 241);
}

// CSS Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// CSS Spinning Loader
.lds-ring {
  display: block;
  position: relative;
  width: 64px;
  height: 64px;
  margin: auto;
  margin-bottom: 16px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid grey;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: grey transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.info {
  margin-left: 10px;
  border-radius: 100px;
}
</style>
