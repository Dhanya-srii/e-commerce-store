<template>
  <div id="app">
    <app-header v-if="!isNotFound" />
    <div
      v-if="!isNotFound"
      class="category-section"
    >
      <category-filter />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import CategoryFilter from './components/CategoryFilter.vue';
export default {
  name: 'App',
  components: { AppHeader, CategoryFilter },
  computed: {
    isNotFound() {
      console.log(this.$route.name);

      return this.$route.name === 'PageNotFound';
    },
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
