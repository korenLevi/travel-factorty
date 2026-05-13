<template>
    <v-snackbar v-model="show" :color="color" top right :timeout="3000">
      <v-icon left>mdi-alert-circle</v-icon>
      {{ message }}
    </v-snackbar>
  </template>
  
  <script>
  import { EventBus } from "../plugins/eventBus";
  
  export default {
    name: "ErrorSnackbar",
    data() {
      return {
        show: false,
        message: "",
        color: "error",
      };
    },
    created() {        
      EventBus.$on("error", (message) => {
        this.message = message;
        this.show = true;
      });
      EventBus.$on("success", (message) => {
        this.message = message;
        this.color = "success";
        this.show = true;
      });
    },
  };
  </script>