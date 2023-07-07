<template>
  <div style="text-align: center">
    <!-- import component-->
    <button @click="oldPlanMethod()" class="btn-style-1 new-plan">
      Old plan
    </button>
    <br />
    <button @click="newPlanMethod()" class="btn-style-1 old-plan">
      New plan
    </button>

    <!--old plan - login -->
    <div v-if="oldPlanBoolean">
      <p style="font-size: 25px; margin: 15px; font-weight: bold">Old plan</p>
      <p style="color: red; margin: 5px">
        <Message />
      </p>
      <input
        v-focus
        type="text"
        v-model="plan"
        style="margin: 10px"
        placeholder="Plan name"
      />
      <br />
      <input
        type="password"
        style="margin-bottom: 10px"
        v-model="password"
        placeholder="Password"
        @keyup.enter="OldPlan()"
      />
      <br />
      <button @click="OldPlan()">Log in</button>
    </div>

    <!-- new plan-->
    <div v-if="newPlanBoolean">
      <p style="font-size: 25px; margin: 15px; font-weight: bold">New plan</p>
      <p style="margin: 5px; font-size: 17px">No registration needed</p>
      <p style="margin: 5px; font-size: 17px">
        Just type plan name and password (remmember it)
      </p>
      <p style="color: red; margin: 5px">
        <Message />
      </p>
      <div>
        <input
          v-focus
          type="text"
          v-model="plan"
          placeholder="Plan name"
          style="margin-bottom: 10px; margin-top: 10px"
        />
        <br />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          style="margin-bottom: 10px"
        />
        <br />
        <input
          type="password"
          v-model="repeatPasword"
          placeholder="Repeat password"
          style="margin-bottom: 10px"
          @keyup.enter="NewPlan()"
        />
        <br />
        <button @click="NewPlan()" style="margin-top: 10px">
          Make new plan
        </button>
      </div>
    </div>

    <!-- Main message -->
    <div v-if="!oldPlanBoolean && !newPlanBoolean" class="welcome-container">
      <p class="welcome-text">Welcome to our Holiday Planner</p>
      <p class="welcome-text app-update">
        Our web application is designed to simplify your trip preparation
        process.
      </p>
      <p class="welcome-text app-update user-info">
        Experience real-time updates, allowing multiple users to collaborate on
        a single plan simultaneously.
      </p>
      <p class="welcome-text app-update app-explain">
        Any additions, modifications, or deletions made by one user are
        instantly shared with all other users.
      </p>
      <p class="welcome-text app-improvement">
        We value your feedback! Please don't hesitate to contact us with any
        suggestions to enhance our application.
      </p>
    </div>
  </div>
</template>

<script>
import Message from "../addOns/Message.vue";
export default {
  components: { Message },
  data() {
    return {
      oldPlanBoolean: false,
      newPlanBoolean: false,
      plan: "",
      password: "",
      repeatPasword: "",
    };
  },

  methods: {
    OldPlan() {
      this.VuexMessage = "";

      if (
        this.plan == "" ||
        this.plan == " " ||
        this.password == "" ||
        this.password == " "
      ) {
        this.$store.dispatch("message", {
          sendMessage: "Please fill out all fields",
          sendMessageColor: "red",
        });
      } else {
        this.$store.dispatch("LoggedIn", {
          plan: this.plan,
          password: this.password,
        });
      }
    },
    NewPlan() {
      if (this.plan == "" || this.plan == " ") {
        this.$store.dispatch("message", {
          sendMessage: "Please type a plan name",
          sendMessageColor: "red",
        });
      } else if (this.password == "" || this.password == " ") {
        this.$store.dispatch("message", {
          sendMessage: "Please type a password",
          sendMessageColor: "red",
        });
      } else if (this.repeatPasword == "" || this.repeatPasword == " ") {
        this.$store.dispatch("message", {
          sendMessage: "Please repeat a password",
          sendMessageColor: "red",
        });
      } else if (this.password != this.repeatPasword) {
        this.$store.dispatch("message", {
          sendMessage: "Passwords do not match",
          sendMessageColor: "red",
        });
      } else {
        this.$store.dispatch("newPlan", {
          plan: this.plan,
          password: this.password,
        });
      }
    },
    newPlanMethod() {
      this.RegIsOK = true;
      this.plan = "";
      this.password = "";
      this.repeatPasword = "";
      this.VuexMessage = "";
      if (this.oldPlanBoolean == true) {
        this.oldPlanBoolean = false;
      }
      this.newPlanBoolean = !this.newPlanBoolean;
      this.$store.dispatch("message", {
        sendMessage: "WELCOME, we hope you will enjoy our holiday planner",
        sendMessageColor: "blue",
      });
    },
    oldPlanMethod() {
      this.VuexMessage = "";
      this.plan = "";
      this.password = "";
      if (this.newPlanBoolean == true) {
        this.newPlanBoolean = false;
      }
      this.oldPlanBoolean = !this.oldPlanBoolean;
      this.$store.dispatch("message", {
        sendMessage: "Glad you’re back",
        sendMessageColor: "blue",
      });
    },
  },
};
</script>

<style>
.btn-style-1 {
  width: 150px;
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.btn-style-1.new-plan {
  background-color: #4caf50;
}

.btn-style-1.old-plan {
  background-color: #4286f4;
}

.btn-style-1:hover {
  filter: brightness(85%);
}
.welcome-container {
  font-size: 25px;
  margin-bottom: 5px;
}
.welcome-container p:first-of-type {
  font-size: 22px;
}

.welcome-container p:not(first-of-type) {
  font-size: 16px;
}

.welcome-text {
  padding: 5px;
  border: 3px solid black;
}

.app-update {
  padding: 5px;
  border: 3px solid gray;
}

.user-info {
  padding: 5px;
  border: 3px solid green;
}
.app-explain {
  padding: 5px;
  border: 3px solid orange;
}

.app-improvement {
  padding: 5px;
  border: 3px solid #4286f4;
}
.welcome-text,
.app-update,
.user-info,
.app-improvement {
  padding: 20px;
  border-radius: 5px;
}

.welcome-text {
  background-color: #f9f9f9;
  color: #333;
  font-weight: bold;
}

.app-update {
  background-color: #f5f5f5;
  color: #333;
}

.user-info {
  background-color: #f5f5f5;
  color: #333;
}

.app-improvement {
  background-color: #f5f5f5;
  color: #333;
}
.app-update,
.user-info,
.app-improvement {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>