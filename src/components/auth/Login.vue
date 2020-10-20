<template>
  <div style="text-align: center">
    <!-- import component-->
    <button @click="oldPlanMethod()" style="width: 150px; margin-bottom: 10px">
      Old plan
    </button>
    <br />
    <button @click="newPlanMethod()" style="width: 150px">New plan</button>

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
    <div v-if="!oldPlanBoolean && !newPlanBoolean">
      <p style="font-size: 30px; margin-bottom: 5px">Welcome</p>
      <p style="padding: 5px; border: 3px solid black">
        This is web application that will make it easier for you to prepare
        things for the trip.
      </p>
      <p style="padding: 5px; border: 3px solid gray">
        The app updates data in real-time so that multiple users can use one
        plan at a same time.
      </p>
      <p style="padding: 5px; border: 3px solid orange">
        Each time a user adds, modifies or deletes an item in the list, all
        users will receive this information immediately.
      </p>
      <p style="padding: 5px; border: 3px solid green">
        If you have any advice on how to improve the application, feel free to
        contact me
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
</style>