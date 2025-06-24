<template>
  <div id="app">
    <app-header />
  
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
