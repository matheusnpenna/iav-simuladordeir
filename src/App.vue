<template>
  <component :is="template">
    <router-view :key="$route.fullPath" />
  </component>
</template>

<script>
import { getToken } from "./setup/api";

export default {
  computed: {
    template() {
      return this.$route.meta.template;
    },
    isLogged() {
      return this.$store.user.logged;
    },
    showRouterView() {
      return !this.$route.meta.protected || this.isLogged;
    },
  },
  watch: {
    $route: function () {
      if (!this.isLogged && this.$route.meta.protected) {
        this.$router.replace({
          name: "login",
          query: { path: this.$route.fullPath },
        });
      }
      window.scrollTo(0, 0);
    },
  },
  beforeMount() {
    if (!getToken() && this.$route.meta.protected) {
      this.$router.replace({ name: "login" });
    } else if (getToken()) {
      this.$store.accounts.postLogin().catch(() => {
        this.$router.replace({
          name: "login",
          query: { path: this.$route.fullPath },
        });
      });
      if (["/login", "/register"].includes(document.location.pathname)) {
        this.$router.replace({ name: "home" });
      }
    }
  },
};
</script>
