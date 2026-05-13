<template>
  <v-card class="mt-6 mb-6 mx-2"  >
    <v-card-title>Submit Vacation Request</v-card-title>
    <v-form ref="form" v-model="valid" @submit.prevent="submitRequest">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-menu v-model="startMenu" :close-on-content-click="false" transition="scale-transition" offset-y>
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="form.startDate"
                  label="Start Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="[rules.required]"
                />
              </template>
              <v-date-picker v-model="form.startDate" @input="startMenu = false" />
            </v-menu>
          </v-col>

          <v-col cols="12" md="4">
            <v-menu v-model="endMenu" :close-on-content-click="false" transition="scale-transition" offset-y>
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="form.endDate"
                  label="End Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="[rules.required, rules.afterStart]"
                />
              </template>
              <v-date-picker v-model="form.endDate" @input="endMenu = false" />
            </v-menu>
          </v-col>

          <v-col cols="12" md="4">
            <v-textarea
              v-model="form.reason"
              label="Reason (optional)"
              rows="3"
              outlined
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" :loading="loading" type="submit" :disabled="!valid">
          Submit Request
        </v-btn>
      </v-card-actions>

      <v-alert v-if="successMessage" type="success" class="mt-3">
        {{ successMessage }}
      </v-alert>
    </v-form>
  </v-card>
</template>

<script>
import axios from "axios";
import { useUserStore } from "../store/user"; 
export default {
  name: "RequestForm",

  data() {
    return {
      valid: false,
      form: {
        startDate: "",
        endDate: "",
        reason: "",
      },
      rules: {
        required: (v) => !!v || "This field is required",
        afterStart: (v) =>
          !this.form.startDate ||
          v >= this.form.startDate ||
          "End date must be after start date",
      },
      startMenu: false,
      endMenu: false,
      loading: false,
      successMessage: "",
    };
  },
  methods: {
    async submitRequest() {
      if (!this.$refs.form.validate()) return;
      
      const userStore = useUserStore(); 

      this.loading = true;
      this.successMessage = "";

      try {
        await axios.post("/api/requests", {
          userId: userStore.currentUser.id,
          startDate: this.form.startDate,
          endDate: this.form.endDate,
          reason: this.form.reason,
        });

        this.successMessage = "Request submitted successfully!";
        this.$refs.form.reset();
        this.$emit("request-submitted");
      } catch (error) {
        console.error("Error submitting request:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>