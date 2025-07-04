<template>
  <div id="app">
    <app-header v-if="!isNotFound" />
    <category-filter v-if="showFilter" />

    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import AppHeader from './components/AppHeader.vue';
import CategoryFilter from './components/CategoryFilter.vue';
export default {
  name: 'App',
  components: { AppHeader, CategoryFilter },
  computed: {
    ...mapState({
      showFilter: (state) => state.storeProducts.showFilter,
    }),
    isNotFound() {
      return (
        this.$route.name === 'PageNotFound' || this.$route.name === 'LoginPage'
      );
    },
  },
  methods: {
    ...mapMutations(['toggleFilter']),
  },
  data() {
    return {};
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
  font-style: normal;
}
</style>
