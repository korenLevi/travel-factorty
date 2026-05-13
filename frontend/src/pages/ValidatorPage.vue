<template>
  <v-container>
    <RequestTableFilter @filter-changed="onFilterChanged" />
    <RequestTable :data="requests" :headers="['id', 'user', 'startDate', 'endDate', 'reason', 'status']"
      @status-changed="updateStatus" isValidator :statusLoading="statusLoading" :loading="loading" />
  </v-container>
</template>

<script>
import RequestTable from "../components/RequestTable.vue";
import RequestTableFilter from "../components/RequestTableFilter.vue";
import { requestsApi } from "../services/api";
import { EventBus } from "../plugins/eventBus";
export default {
  name: "ValidatorPage",
  components: { RequestTableFilter, RequestTable },
  data() {
    return {
      requests: [],
      filters: { name: "", status: "All" },
      loading: false,
      statusLoading: false,
    };
  },

  created() {
    this.fetchRequests();
  },
  methods: {
    onFilterChanged(filters) {
      this.filters = filters;
      this.fetchRequests();
    },
    async fetchRequests() {
      this.loading = true;
      const params = {};
      if (this.filters.name) params.name = this.filters.name;
      if (this.filters.status !== "All") params.status = this.filters.status;

      try {
        const response = await requestsApi.getAll(params);
        this.requests = response.data.map((req) => ({
          id: req.id,
          user: req.user.name,
          startDate: req.startDate,
          endDate: req.endDate,
          reason: req.reason || "-",
          status: req.status,
          comments: req.comments || "",
        }));
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async updateStatus({ id, status, comments }) {
      console.log('id, status, comments',id, status, comments);
      
      this.statusLoading = true;
      try {
        await requestsApi.updateStatus(id, status, comments);
        this.fetchRequests();
        EventBus.$emit("success", "Status or comments updated successfully");
      } catch (error) {
        console.error(error);
      } finally {
        this.statusLoading = false;
      }
    },
  },

};
</script>