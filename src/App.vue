<template>
  <div id="app">
    <app-header v-if="!isHiddenHeader" />
    <category-filter v-if="showFilter" />
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AppHeader from './components/AppHeader.vue';
import CategoryFilter from './components/CategoryFilter.vue';
import { ROUTE_NAMES } from './constants/Routes';

export default {
  components: { AppHeader, CategoryFilter },
  computed: {
    ...mapState({
      showFilter: (state) => state.storeProducts.showFilter,
    }),
    isLoginPage() {
      return this.$route.name === ROUTE_NAMES.LOGIN_PAGE;
    },
    isHiddenHeader() {
      return [ROUTE_NAMES.PAGE_NOT_FOUND, ROUTE_NAMES.LOGIN_PAGE].includes(
        this.$route.name
      );
    },
  },
  created() {
    this.checkSession();
  },
  methods: {
    ...mapActions(['logout', 'getUser']),
    async checkSession() {
      try {
        const token = document.cookie
          .split('; ')
          .find((ele) => ele.startsWith('accessToken='))
          ?.split('=')[1];

        if (!token) {
          this.logout();
          if (!this.isLoginPage) {
            this.$router.push({ name: ROUTE_NAMES.LOGIN_PAGE });
          }
          return;
        }
        await this.getUser();
        if (this.isLoginPage) {
          this.$router.push({ name: ROUTE_NAMES.PRODUCTS });
        }
      } catch {
        this.logout();
        if (!this.isLoginPage) {
          this.$router.push({ name: ROUTE_NAMES.LOGIN_PAGE });
        }
      }
    },
  },
};
</script>

<style src="@/assets/styles/abstracts/root.css"></style>
<style src="@/assets/styles/base/scrollbar.css"></style>
<style src="@/assets/styles/base/reset.css"></style>
<style>
* {
  font-family: 'Lilita One', sans-serif;
  font-weight: 600;
}
</style>
