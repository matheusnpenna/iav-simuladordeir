import { useUsersStore } from "./user";

const initStore = () => {
  return {
    user: useUsersStore(),
  };
};

export default initStore;
