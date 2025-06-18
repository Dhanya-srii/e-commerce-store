<template>
  <div class="header">
    <div class="brand" @click="handleHomeRoute()">
      <h1 class="brandName">PLUGO</h1>
    </div>
    <div class="searchProduct">
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
      <button @click="clearSearch" class="headerButton">Clear</button>
    </div>
    <div class="userProducts">
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
      searchedProduct: [],
    };
  },

  methods: {
    handleHomeRoute() {
      if (this.$route.path != '/products') {
        this.$router.push('/products');
      }
    },
    listFavouritesRoute() {
      if (this.$route.path != '/favourites') {
        this.$router.push('/favourites');
      }
    },
    ...mapMutations(['setProductData']),
    async clearSearch(product) {
      try {
        this.searchedProduct = await products.fetchAllProducts(product);
        console.log(this.searchedProduct);
        
        this.setProductData(this.searchedProduct);
        this.userSearch = '';
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    },
    async displaySearchedProduct(product) {
      try {
        this.searchedProduct = await products.searchProduct(product);
        this.setProductData(this.searchedProduct);
        console.log(this.searchedProduct);
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
