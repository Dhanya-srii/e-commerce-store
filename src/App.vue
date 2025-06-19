<template>
  <div id="app">
    <app-header />
    <router-link to="/products"></router-link>
    <router-link to="/favourites"></router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
export default {
  name: 'App',
  components: { AppHeader },
};
</script>

<style src="@/assets/styles/base/reset.css"></style>
<style>
* {
  font-family: var(--font-family);
}
</style>
