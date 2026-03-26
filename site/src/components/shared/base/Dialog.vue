<template>
  <div v-bind="api.getTriggerProps()">
    <slot name="button">Open dialog</slot>
  </div>

  <Teleport to="body">
    <div v-if="api.open">
      <div v-bind="api.getBackdropProps()" />
      <div v-bind="api.getPositionerProps()">
        <div
          v-bind="api.getContentProps()"
          class="font-ui h-fit z-30 fixed inset-0 m-auto bg-c flex flex-col overflow-hidden text-c shadow-c"
          :class="boxClass"
          border="1 gray-400 dark:gray-500 rounded-md"
        >
          <div hstack justify-between pl-4 pr-3 py-2.5>
            <div hstack text-sm>
              <span :class="icon" />
              <span mx-2 text-light-c>/</span>
              <span v-bind="api.getTitleProps()">{{ title }}</span>
            </div>

            <button
              class="circle p-1 duration-100 hover:(bg-dark-c rotate-90)"
              v-bind="api.getCloseTriggerProps()"
            >
              <span i-ic:baseline-close />
            </button>
          </div>

          <slot name="content" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import * as dialog from "@zag-js/dialog";
import { normalizeProps, useMachine } from "@zag-js/vue";

const props = defineProps<{
  id: string;
  title: string;
  icon: string;
  boxClass?: string;
}>();

const service = useMachine(dialog.machine, { id: props.id });
const api = computed(() => dialog.connect(service, normalizeProps));
</script>
