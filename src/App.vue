<template>
  <main class="main">
    <div class="wrapper">
      <div class="top">
        <div class="top__left">
          <BaseItem
            v-for="(item, ix) in store.items"
            :key="ix"
            v-bind="item"
            inSelected
          />
        </div>

        <div class="top__right">
          <BaseItem v-if="store.selected" v-bind="store.selected" />
          <button
            :disabled="store.isSelectableButtonDisabled"
            @click="store.unselectItem()"
          >
            Unselect item
          </button>
          <button
            :disabled="store.isSelectableButtonDisabled"
            @click="store.addItem()"
          >
            Add item
          </button>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom__left">
          <BaseItem v-for="(item, ix) in left" :key="ix" v-bind="item" />
        </div>
        <div class="bottom__right">
          <BaseItem
            v-for="(item, ix) in right"
            :key="ix"
            v-bind="item"
            :disabled="store.rightButtonsDisabled"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import BaseItem from "./components/BaseItem.vue";
import { left, right } from "./constants/items";
import useItemsStore from "./store/useItemsStore";

const store = useItemsStore();
</script>

<style lang="scss" scoped>


.main {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}
.wrapper {
  width: 60vw;

  height: 80vh;
  background-color: #cbd5e1;

  border: 3px solid #334155;

  margin: 0 auto;

  display: grid;

  grid-template-rows: 1fr 1fr;


  padding: 4rem;
}

@mixin section {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

@mixin column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
}

.bottom {
  @include section();

  div {
    @include column;
  }
}

.top {
  @include section();

  &__right {
    @include column;
  }

  &__left {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr 1fr;
    gap: 1rem;
    height: 60%;
  }
}
</style>
