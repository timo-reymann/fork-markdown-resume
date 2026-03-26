<template>
  <div v-bind="groupApi.getGroupProps({ placement: 'bottom-end' })" class="toast-container">
    <Toast v-for="toast in toasts" :key="toast.id" :actor="toast" />
  </div>
</template>

<script setup lang="ts">
import * as toast from "@zag-js/toast";
import { normalizeProps, useMachine } from "@zag-js/vue";

const nuxtApp = useNuxtApp();

const store = toast.createStore({
  placement: "bottom-end",
  duration: 2500,
  removeDelay: 750
});

const service = useMachine(toast.group.machine, {
  id: "toast",
  store
});

const groupApi = computed(() => toast.group.connect(service, normalizeProps));
const toasts = computed(() => groupApi.value.getToasts());

nuxtApp.provide("toastStore", store);
</script>
