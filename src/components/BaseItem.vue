<template>
  <button @click="selectItem" :disabled="computedDisabled">
    <p>{{ name }}</p>

    <p :class="computedUnselectClass">Unselect</p>
  </button>
</template>

<script setup>
import { computed } from "vue";
import useItemsStore from "../store/useItemsStore";

const props = defineProps({
  name: String,
  id: Number,
  inSelected: {
    type: Boolean,
    default: false,
  },
});

const store = useItemsStore();

function makeItem() {
  return { name: props.name, id: props.id };
}

function selectItem() {
  const item = makeItem();

  if (props.inSelected) {
    store.removeItem();
  } else store.selectItem(item);
}

const computedDisabled = computed(() => {
  const item = makeItem();

  return store.figureDisabled(item) && !props.inSelected;
});

const computedUnselectClass = computed(() => {
  if (props.inSelected) return "unselect";
  else return "none";
});
</script>

<style lang="scss" scoped>
.none {
  display: none;
  visibility: none;
}
$gray: #334155;
button {
  padding: 1rem 2rem;
  cursor: pointer;

  border: none;
  transition: 0.2s all ease;

  background-color: $gray;

  color: white;

  position: relative;
  &:disabled {
    background-color: gray;

    color: black;

    cursor: default;
  }
}

.unselect {
  color: red;

  display: grid;
  place-items: center;

  background-color: $gray;

  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

  width: 100%;
  height: 100%;

  opacity: 0;
  z-index: 12;

  transition: 0.2s all;
}

.unselect:hover {
  opacity: 1;
}
</style>
