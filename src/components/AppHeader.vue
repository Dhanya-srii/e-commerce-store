<template>
  <div class="header-container">
    <div
      class="brand"
      @click="goToProductList()"
    >
      <h1 class="brand-name">PLUGO</h1>
    </div>
    <div class="user-controls">
      <div class="search-container">
        <input
          class="search-input"
          type="text"
          placeholder="Search Product..."
          v-model.trim="searchQuery"
          @keyup.enter="searchProduct"
        />
        <button
          @click="searchProduct"
          class="header-button"
        >
          <i
            class="fa-brands fa-searchengin"
            style="color: #f2f2f2"
          ></i>
        </button>
        <button
          v-if="showClear"
          @click="resetSearch"
          class="header-button"
        >
          <i
            class="fa-solid fa-eraser"
            style="color: #f5f5f5"
          ></i>
        </button>
      </div>
      <div class="user-actions">
        <button
          class="fav-header"
          @click="goToFavourites()"
        >
          <i class="fa-solid fa-heart"></i>
        </button>
        <button class="header-button">
          <i
            class="fa-solid fa-cart-shopping"
            style="color: #f2f2f2"
          ></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
// Dependency
import { mapMutations } from 'vuex';
// API
import { products } from '../api/products';

import { ROUTE_NAMES } from '../constants/Routes';
export default {
  data() {
    return {
      searchQuery: '',
      showClear: false,
    };
  },

  methods: {
    ...mapMutations(['setproductData']),

    goToProductList() {
      if (this.$route.name !== ROUTE_NAMES.PRODUCTS) {
        this.$router.push({
          name: ROUTE_NAMES.PRODUCTS,
        });
      }
    },
    goToFavourites() {
      if (this.$route.name !== ROUTE_NAMES.FAVOURITE_PRODUCTS) {
        this.$router.push({
          name: ROUTE_NAMES.FAVOURITE_PRODUCTS,
        });
      }
    },

    async resetSearch() {
      try {
        const productData = await products.fetchAllProducts();
        this.setproductData(productData);
        this.searchQuery = '';
        this.showClear = false;
      } catch (error) {
        alert('Error loading products:', error);
      }
    },

    async searchProduct() {
      if (!this.searchQuery) return;
      try {
        const results = await products.fetchSearchProduct(this.searchQuery);
        this.setproductData(results);
        this.showClear = true;
      } catch (error) {
        alert('Error Searching Product', error);
      }
    },
  },
};
</script>
<style scoped src="@/assets/styles/layout/header.css"></style>
<style scoped src="@/assets/styles/components/button.css"></style>
<style scoped src="@/assets/styles/components/input.css"></style>
