<template>
  <div id="app">
    <app-header v-if="!canShowHeader" />
    <category-filter v-if="showFilter" />
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import AppHeader from './components/AppHeader.vue';
import CategoryFilter from './components/CategoryFilter.vue';
import { ROUTE_NAMES } from './constants/Routes';

export default {
  watch: {
    '$route.name': {
      handler(to) {
        if (to != 'ProductList') {
          this.resetProductsList();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  components: { AppHeader, CategoryFilter },
  computed: {
    ...mapState({
      showFilter: (state) => state.storeProducts.showFilter,
    }),
    isLoginPage() {
      return this.$route.name === ROUTE_NAMES.LOGIN_PAGE;
    },
    canShowHeader() {
      return [ROUTE_NAMES.PAGE_NOT_FOUND, ROUTE_NAMES.LOGIN_PAGE].includes(
        this.$route.name
      );
    },
  },
  created() {
    this.checkSession();
  },
  methods: {
    ...mapMutations(['resetProductsList']),
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
    }
  },
};
</script>

<style
  lang="scss"
  src="/home/dhan-zstch1544/Vue/mobile-applications/src/styles/styles.scss"
/>