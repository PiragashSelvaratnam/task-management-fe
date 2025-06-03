import { defineStore } from "pinia";

interface User {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({ user: {} as User, accessToken: "" }),
  getters: {
    getUser: (state: any) => state.user,
    getAccessToken: (state: any) => state.accessToken,
  },
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    setAccessToken(token: string) {
      this.accessToken = token;
    },
  },
  persist: true,
});
