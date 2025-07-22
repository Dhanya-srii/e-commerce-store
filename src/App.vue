<template>
  <div id="app">
    <!-- <link
      rel="stylesheet"
      href="/src/styles.scss"
    /> -->
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
    },
  },
};
</script>

<style lang="scss">
// @import '/src/styles.scss';
</style>

<style lang="scss" src="@/styles/abstracts/_variables.scss"></style>
<style lang="scss" src="@/styles/layout/_layout.scss"></style>
<style lang="scss" src="@/styles/base/scrollbar.scss"></style>
<style lang="scss" src="@/styles/base/reset.scss"></style>
<style>
* {
  font-family: 'Lilita One', sans-serif;
  font-weight: 600;
}
</style>
