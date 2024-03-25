import { defineStore } from "pinia";
import actions from "./actions";
import state from "./state";

export const useUsersStore = defineStore("user", {
  state: state(),
  actions,
});
