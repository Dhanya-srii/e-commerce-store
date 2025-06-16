<template>
  <div class="header">
    <div class="brand" @click="handleHome()">
      <h1>PLUGO</h1>
    </div>
    <div class="searchProduct">
      <input class="userSearch"
        type="text"
        placeholder="Search..."
        v-model.trim="userSearch"
        @keyup.enter="searchProduct()"
      />
      <button @click="searchProduct()" class="find">Find</button>
    </div>
    <div class="userProducts">
      <button class="favHeader" @click="listFavourites()">
        <i class="fa-solid fa-heart"></i>
      </button>
      <button class="find">Cart</button>
    </div>
  </div>
</template>
<script>
import { products } from '../api/products';
export default {
  data() {
    return {
      userSearch: '',
      data: '',
    };
  },
  async created() {
    this.data = await products.fetchAllProducts();
  },
  methods: {
    handleHome() {
      const targetRoute = '/products';
      if (this.$route.path != targetRoute) {
        this.$router.push('/products');
      }
    },
    listFavourites() {
      if (this.$route.path != '/favourites') {
        this.$router.push('/favourites');
      }
    },
    searchProduct() {
      const search = this.data.find(
        (s) => s.title.toLowerCase() === this.userSearch.toLowerCase()
      );
      this.userSearch = '';
      if (search) {
        this.$store.commit('getSearchedProduct', search);
      }
    },
  },
};
</script>
<style src="@/assets/styles/layout/header.css"></style>
<style src="@/assets/styles/components/button.css"></style>
<style src="@/assets/styles/components/input.css"></style>
