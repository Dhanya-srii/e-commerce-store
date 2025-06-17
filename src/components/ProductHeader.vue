<template>
  <div class="header">
    <div class="brand" @click="handleHome()">
      <h1 class="brandName">PLUGO</h1>
    </div>
    <div class="searchProduct">
      <input
        class="userSearch"
        type="text"
        placeholder="Search..."
        v-model.trim="userSearch"
        @keyup.enter="displaySearchedProduct(userSearch)"
      />
      <button @click="displaySearchedProduct(userSearch)" class="find">
        Find
      </button>
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
      searchedProduct: {},
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

    async displaySearchedProduct(product) {
      try {
        this.searchedProduct = await products.searchProduct(product);
        this.$router.replace(`/products/search?q=${product}`);
        // this.userSearch = '';
        this.$store.commit('getSearchedProduct', this.searchedProduct);
        console.log('after commit', this.searchedProduct);
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
