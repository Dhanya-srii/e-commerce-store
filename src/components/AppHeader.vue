<template>
  <div class="header-container">
    <div class="brand" @click="goToProductList()">
      <h1 class="brand-name">PLUGO</h1>
    </div>
    <div class="search-container">
      <input
        class="search-input"
        type="text"
        placeholder="Search Product..."
        v-model.trim="searchQuery"
        @keyup.enter="searchProduct"
      />
      <button @click="searchProduct" class="header-button">Find</button>
      <button v-if="showClear" @click="resetSearch" class="header-button">
        Clear
      </button>
    </div>
    <div class="user-actions">
      <button class="fav-header" @click="goToFavourites()">
        <i class="fa-solid fa-heart"></i>
      </button>
      <button class="header-button">Cart</button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import { products } from '../api/products';

export default {
  data() {
    return {
      searchQuery: '',
      showClear: false,
    };
  },

  methods: {
    ...mapMutations(['setAllProducts']),

    goToProductList() {
      if (this.$route.path !== '/products') {
        this.$router.push('/products');
      }
    },
    goToFavourites() {
      if (this.$route.path !== '/favourites') {
        this.$router.push('/favourites');
      }
    },

    async resetSearch() {
      try {
        const allProducts = await products.fetchAllProducts();
        this.setAllProducts(allProducts);
        this.searchQuery = '';
        this.showClear = false;
      } catch (error) {
        console.error('Error loading products:', error);
      }
    },

    async searchProduct() {
      if (!this.searchQuery) return;
      try {
        const results = await products.fetchSearchProduct(this.searchQuery);
        this.setAllProducts(results);
        this.showClear = true;
      } catch (error) {
        console.error('Error Searching Product', error);
      }
    },
  },
};
</script>
<style src="@/assets/styles/layout/header.css"></style>
<style src="@/assets/styles/components/button.css"></style>
<style src="@/assets/styles/components/input.css"></style>
