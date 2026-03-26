<template>
  <div v-bind="api.getRootProps()" relative>
    <div
      v-bind="api.getControlProps()"
      class="hstack h-9 space-x-2 px-2 py-1 rounded border"
      :class="api.open ? 'border-darker-c' : 'border-c'"
    >
      <input
        v-bind="api.getInputProps()"
        class="w-full outline-none bg-transparent capitalize"
        @focus="api.setOpen(true)"
      />
      <div size-5 flex-center>
        <span v-show="api.open" i-ic:sharp-arrow-drop-up text-lg />
        <span v-show="!api.open" i-ic:sharp-arrow-drop-down text-lg />
      </div>
    </div>

    <div v-bind="api.getPositionerProps()">
      <ul
        v-if="options.length > 0"
        v-bind="api.getContentProps()"
        class="dropdown-container z-20 max-h-60 -mt-1"
      >
        <li
          v-for="item in options"
          :key="item.value"
          v-bind="api.getItemProps({ item })"
          class="dropdown-li"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as combobox from "@zag-js/combobox";
import { normalizeProps, useMachine } from "@zag-js/vue";
import type { ComboboxItem } from "~/types";

const props = defineProps<{
  id: string;
  items: Array<ComboboxItem>;
  default: string;
}>();

const options = ref(props.items);

const collectionRef = computed(() =>
  combobox.collection({
    items: options.value,
    itemToValue: (item) => item.value,
    itemToString: (item) => item.label
  })
);

const service = useMachine(combobox.machine, computed(() => ({
  id: props.id,
  collection: collectionRef.value,
  defaultValue: [props.default],
  closeOnSelect: false,
  onInputValueChange: ({ value }: { value: string }) => {
    const filtered = props.items.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    );
    options.value = filtered.length > 0 ? filtered : props.items;
  },
  onValueChange: ({ items }: { items: ComboboxItem[] }) => {
    items[0]?.onSelect();
  }
})));

const api = computed(() => combobox.connect(service, normalizeProps));

watch(
  () => props.default,
  () => api.value.setValue([props.default])
);

watch(
  () => props.items,
  () => (options.value = props.items)
);
</script>

<style scoped>
[data-part="item"][data-highlighted] {
  @apply bg-dark-c;
}
</style>
