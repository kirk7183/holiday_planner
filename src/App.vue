<template>
  <div id="app" class="container">
    <p class="ime">web-app-developer: vasicigorjsp@gmail.com</p>
    <img alt="Vue logo" src="./assets/holiday_planner.png" class="logo" style />
    <!-- import components -->
    <Login v-if="!IsLoggedIn"></Login>
    <todo-list v-if="IsLoggedIn"></todo-list>
  </div>
</template>
<script>
import firebaseApp from "./firebase";
import TodoList from "./components/TodoList.vue";
import Login from "./components/auth/Login.vue";
export default {
  name: "App",
  components: {
    Login,
    TodoList,
  },
  data() {
    return {};
  },
  beforeCreate: function () {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit("IS_LOGGED_IN", { IsLoggedIn: true });
        var planName = user.email;
        planName = planName.substring(0, planName.length - 10);
        this.$store.commit("PLAN_NAME", planName);
      }
    });
  },

  computed: {
    IsLoggedIn: {
      get() {
        return this.$store.getters.IsLoggedIn;
      },
    },
  },
};
</script>


<style>
* {
  box-sizing: border-box;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}
.logo {
  display: block;

  margin: 10px auto;
  margin-bottom: 0;
  height: 95px;
}
.ime {
  margin: 0;
  font-size: 12px;
  /* display: flex; */
  text-align: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  font-size: 18px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
p {
  display: flex;
  justify-content: center;
}
</style>
