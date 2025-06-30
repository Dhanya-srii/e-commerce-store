<template>
  <div class="header-container">
    <div class="sub-header-container">
      <div
        class="brand"
        @click="goToProductList()"
      >
        <h1 class="brand-name">PLUGO</h1>
      </div>
      <div class="user-controls">
        <input
          class="search-input"
          type="text"
          placeholder="SEARCH"
          v-model.trim="searchQuery"
          @keyup.enter="searchProduct"
        />
        <button
          @click="searchProduct"
          class="header-button"
        >
          <i class="ri-search-line"></i>
        </button>
        <button
          v-if="showClear"
          @click="resetSearch"
          class="header-button"
        >
          <i
            class="ri-eraser-line"
            style="color: #f5f5f5"
          ></i>
        </button>

        <button
          class="header-button"
          @click="goToFavourites()"
        >
          <i
            class="ri-heart-line"
            style="color: #f5f5f5"
          ></i>
          <p
            v-if="hasFavourites"
            class="favourite-list-count"
          >
            {{ hasFavourites }}
          </p>
        </button>
        <button
          class="cart"
          @click="goToProductCart"
        >
          <i
            class="ri-shopping-cart-line"
            style="color: #f5f5f5"
          ></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
// Dependency
import { mapGetters, mapMutations } from 'vuex';
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
  computed: {
    ...mapGetters(['hasFavourites']),
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
    goToProductCart() {
      if (this.$route.name != ROUTE_NAMES.PRODUCT_CART) {
        this.$router.push({
          name: ROUTE_NAMES.PRODUCT_CART,
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
