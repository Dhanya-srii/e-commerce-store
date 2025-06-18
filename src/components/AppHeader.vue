<template>
  <div class="header-container">
    <div class="brand" @click="handleHomeRoute()">
      <h1 class="brandName">PLUGO</h1>
    </div>
    <div class="fetchSearchProduct">
      <input
        class="userSearch"
        type="text"
        placeholder="Search Product..."
        v-model.trim="userSearch"
        @keyup.enter="displaySearchedProduct(userSearch)"
      />
      <button @click="displaySearchedProduct(userSearch)" class="headerButton">
        Find
      </button>
      <button v-if="isClear" @click="clearSearch" class="headerButton">
        Clear
      </button>
    </div>
    <div class="userActions">
      <button class="favHeader" @click="listFavouritesRoute()">
        <i class="fa-solid fa-heart"></i>
      </button>
      <button class="headerButton">Cart</button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import { products } from '../api/products';

export default {
  data() {
    return {
      userSearch: '',
      isClear: false,
    };
  },
  methods: {
    handleHomeRoute() {
      if (this.$route.path !== '/products') {
        this.$router.push('/products');
      }
    },
    listFavouritesRoute() {
      if (this.$route.path !== '/favourites') {
        this.$router.push('/favourites');
      }
    },
    ...mapMutations(['setProductData']),

    async clearSearch() {
      try {
        const allProducts = await products.fetchAllProducts();
        this.setProductData(allProducts);
        this.userSearch = '';
        this.isClear = false;
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    },

    async displaySearchedProduct(product) {
      try {
        const result = await products.fetchSearchProduct(product);
        this.setProductData(result);
        this.isClear = true;
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    },
  },
};
</script>
<style src="@/assets/styles/layout/header.css"></style>
<style src="@/assets/styles/components/button.css"></style>
<style src="@/assets/styles/components/input.css"></style>
