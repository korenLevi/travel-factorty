<template>
  <v-card class="mt-4 mb-4 mx-16 pa-4">
    <v-form>
      <v-row >
        <v-col cols="4" >
          <v-text-field
            v-model="filterName"
            label="Search by Name"
            outlined
            dense
            clearable
            hide-details
            prepend-icon="mdi-magnify"
           
          />
        </v-col>
        <v-col cols="4" >
          <v-select
            v-model="filterStatus"
            :items="['All', 'Pending', 'Approved', 'Rejected']"
            label="Filter by Status"
            outlined
            dense
            hide-details
          />
        </v-col>
        <v-col cols="2" >
          <v-btn text @click="clearFilters">Clear</v-btn>
        </v-col>
        <v-col cols="2" >
          <v-btn text @click="emitFilters">Search</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "RequestTableFilter",
  data() {
    return {
      filterName: "",
      filterStatus: "All",
    };
  },
  methods: {
    emitFilters() {
      this.$emit("filter-changed", {
        name: this.filterName,
        status: this.filterStatus,
      });
    },
    clearFilters() {
      this.filterName = "";
      this.filterStatus = "All";
      this.emitFilters();
    },
  },
};
</script>
