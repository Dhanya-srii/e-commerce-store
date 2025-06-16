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

    // console.log(this.data);
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
    // handleSearch(product) {
    //   this.userSearch = product;
    //   this.$router.push(`/product/search?q=${product}`);
    //   console.log(this.userSearch);
    // },
    async displaySearchedProduct(product) {
      try {
        this.searchedProduct = await products.searchProduct(product);
        this.$router.push(`/search?q=${product}`);
        console.log('searched', this.searchedProduct);
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
