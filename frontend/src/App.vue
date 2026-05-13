<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />

        <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100" />
      </div>
      <v-spacer></v-spacer>
      <v-btn @click="userSwitchDialog = true">
        <span class="mr-2">User Switch</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-dialog v-model="userSwitchDialog" max-width="300" persistent>
      <v-card>
        <v-card-title>User Switch</v-card-title>
        <v-card-text>
          <v-select v-model="selectedUser" :items="users" label="Select User"></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="switchUser">Switch</v-btn>
        </v-card-actions>

        <v-container>
          <v-form ref="form" v-model="valid" @submit.prevent="createUser">
            <v-text-field v-model="form.name" label="User Name" :rules="[rules.required]"></v-text-field>
            <v-select v-model="form.role" :items="['Requester', 'Validator']" label="User Role"
              :rules="[rules.required]"></v-select>
            <v-btn color="primary" :loading="loading" type="submit" :disabled="!valid">
              Create User
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>

    <v-main v-if="selectedUser && !userSwitchDialog">
      <router-view />
      <ErrorSnackbar />
    </v-main>
  </v-app>
</template>

<script>
import { usersApi } from "./services/api";
import { useUserStore } from "./store/user";
import router from "./router";
import ErrorSnackbar from "./components/ErrorSnackbar.vue";
export default {
  name: "App",
  components: {
    ErrorSnackbar,
  },
  data() {
    return {
      userSwitchDialog: false,
      selectedUser: null,
      users: [],
      form: {
        name: "",
        role: "",
      },
      valid: false,
      loading: false,
      rules: {
        required: (v) => !!v || "This field is required",
      },
    };
  },
  created() {
    this.fetchUsers();
    const userStore = useUserStore();
    if (!userStore.currentUser && JSON.parse(localStorage.getItem('currentUser')) === null) {
      this.userSwitchDialog = true;
    } else {
      this.selectedUser = userStore.currentUser || JSON.parse(localStorage.getItem('currentUser'));
      if (router.currentRoute.path !== `/${this.selectedUser.role.toLowerCase()}`) {
        router.push(`/${this.selectedUser.role.toLowerCase()}`);
      }
    }
  },
  methods: {
    switchUser() {
      const userStore = useUserStore();
      userStore.setCurrentUser(this.selectedUser);
      if (router.currentRoute.path !== `/${this.selectedUser.role.toLowerCase()}`) {
        router.push(`/${this.selectedUser.role.toLowerCase()}`);
      }
      localStorage.setItem('currentUser', JSON.stringify(this.selectedUser));
      this.userSwitchDialog = false;
    },
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await usersApi.getAll();
        this.users = response.data.map((user) => ({
          text: `${user.name} - ${user.role}`,
          value: user,
        }));
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        this.loading = false;
      }
    },
    async createUser() {
      if (!this.$refs.form.validate()) return;
      this.loading = true;
      try {
        const response = await usersApi.create(this.form);
        this.users.push({
          text: `${response.data.name} - ${response.data.role}`,
          value: response.data,
        });
        this.selectedUser = response.data;
        this.switchUser();
      } catch (error) {
        console.error("Error creating user:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
