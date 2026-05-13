<template>
  <div class="mt-4 mb-4 mx-2">
    <v-data-table :headers="tableHeaders" :items="data" :items-per-page="5" class="elevation-1 " :loading="loading"
      loading-text="Loading requests...">

      <template v-if="isValidator" v-slot:item.status="{ item }">
        <div class="d-flex justify-end" style="gap: 10px;">
          <v-select :loading="statusLoading" v-model="item.status" :items="['Pending', 'Approved', 'Rejected']" dense
            outlined hide-details style="max-width: 150px" />

          <v-text-field v-model="item.comments" label="Comments" outlined dense hide-details />
          <v-btn :loading="statusLoading" :disabled="!hasChanges(item)"
            @click="$emit('status-changed', { id: item.id, status: item.status, comments: item.comments })" text
            color="primary">
            Update</v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>
   <!-- eslint-disable vue/valid-v-slot -->
<script>
export default {
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    isValidator: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    statusLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      originalData: [],
    };
  },
  methods: {
    hasChanges(item) {
      return JSON.stringify(item) !== JSON.stringify(this.originalData.find((i) => i.id === item.id));
    },
  },
  computed: {
    tableHeaders() {
      return this.headers.map((h) => ({
        text: h,
        value: h,
      }));
    },
  },
  watch: {
    data(newVal) {
      if (!this.isValidator) return
      this.originalData = JSON.parse(JSON.stringify(newVal));
    },
  },
};
</script>

<style></style>
