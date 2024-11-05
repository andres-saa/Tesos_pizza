import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('cart-bot', {
  state: () => {
    return {
      side_bar_visible: false,
      visible_categoires: false,
    }
  },

  getters: {},

  actions: {
    toggle(state) {
      this.side_bar_visible = !this.side_bar_visible
    },

    toggle_visible_categories() {
      this.visible_categoires = !this.visible_categoires
    },
  },
})
