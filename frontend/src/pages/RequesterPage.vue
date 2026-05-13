<template>
  <div>
    <RequestForm @request-submitted="fetchRequests" />
    <RequestTable
      :data="requests"
      :headers="['id', 'user', 'status', 'startDate', 'endDate', 'reason']"
      :loading="loading"
    />
  </div>
</template>

<script>
import RequestTable from "@/components/RequestTable.vue";
import RequestForm from "@/components/RequstForm.vue";
import { requestsApi } from "../services/api";
export default {
  components: {
    RequestTable,
    RequestForm,
  },
  data() {
    return {
      requests: [],
      loading: false,
    };
  },
  created() {
    this.fetchRequests();
  },
  methods: {
    async fetchRequests() {
      this.loading = true;
      try {
        const response = await requestsApi.getAll();

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
        console.error("Error fetching requests:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
