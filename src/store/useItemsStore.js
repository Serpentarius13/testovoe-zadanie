import { defineStore } from "pinia";
import shallowEqualityCheck from "../functions/checkShallowEquals";

import { left, right } from "../constants/items";

export default defineStore("items-store", {
  state: () => ({
    selectedItem: null,
    items: [],
  }),

  actions: {
    selectItem(item) {
      this.selectedItem = item;
      console.log(item);
    },
    unselectItem() {
      this.selectedItem = null;
    },
    addItem() {
      const item = this.selectedItem;

      if (this.items.length > 5) {
        this.items.pop();
      }
      this.items.unshift(item);
      this.unselectItem();
    },
    removeItem(item) {
      this.items = this.items.filter((el) => el == item);
    },

    figureDisabled(item) {
      return this.items.some((el) => shallowEqualityCheck(el, item));
    },
  },
  getters: {
    selected(state) {
      return state.selectedItem;
    },
    allItems(state) {
      return state.items;
    },
    isSelectableButtonDisabled(state) {
      return !state.selectedItem;
    },
    rightButtonsDisabled(state) {
      let containsInRightItems = false;

      right.forEach((rightItem) => {
        if (this.figureDisabled(rightItem)) {
          containsInRightItems = true;
        }
      });
      return containsInRightItems;
    },
  },
});
