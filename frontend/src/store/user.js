import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
    users: [],
  }),

  actions: {
    setCurrentUser(user) {
      this.currentUser = user
      localStorage.setItem('currentUser', JSON.stringify(user))      
    },
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('currentUser'))
    },
  },
})