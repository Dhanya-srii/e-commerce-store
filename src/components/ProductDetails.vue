<template>
  <div>
    <div v-if="isLoading" class="loading-container">
      <div class="spinner"></div>
      <p>Loading product...</p>
    </div>
    <div v-else class="product-container">
      <button @click="goBackRoute" class="back-button">Back</button>
      <div class="sub-images">
        <div
          class="sub-img-div"
          v-for="image in selectedProduct.images"
          :key="image"
        >
          <img class="sub-images" :src="image" alt="image" />
        </div>
      </div>

      <div class="main-image-section">
        <img :src="selectedProduct.images[0]" alt="Product image" />
      </div>

      <div class="product-details">
        <p class="brand-title">EVERYDAY HUMANS</p>
        <h1 class="title">{{ selectedProduct.title }}</h1>
        <el-rate
          v-model="value"
          disabled
          show-score
          text-color="#ec9854"
          score-template="{value} points"
        ></el-rate>
        <p class="price">${{ selectedProduct.price }}</p>
        <p class="description">{{ selectedProduct.description }}</p>

        <div>
          <h2>Size:</h2>
          <div class="size-options">
            <button class="size-option">50ml</button>
            <button class="size-option">100ml</button>
          </div>

          <div class="action-buttons">
            <div class="quantity-controller">
              <button class="counter-button" @click="decreaseQuantity">
                -
              </button>
              <p class="quantity-display">{{ quantity }}</p>
              <button class="counter-button" @click="increaseQuantity">
                +
              </button>
            </div>
            <button class="addCart-details">Add to Cart</button>
            <button
              class="fav-detail"
              @click="toggleFavourite(selectedProduct)"
            >
              <i
                class="fa-solid fa-heart"
                :style="{ color: isFav() ? 'red' : 'gray' }"
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { products } from '../api/products';
export default {
  name: 'ProductDetail',
  data() {
    return {
      value: 4.5,
      quantity: 0,
      selectedProduct: {},
      isLoading: true,
    };
  },
  computed: {
    ...mapState({
      favourites: (state) => state.storeProducts.favourites,
    }),
  },
  async created() {
    await this.loadProductData();
  },
  methods: {
    ...mapMutations(['setFavList']),

    async loadProductData() {
      try {
        this.isLoading = true;
        const productId = this.$route.params.id;

        this.selectedProduct = await products.fetchSingleProduct(productId);
      } catch (error) {
        console.error('Error loading Product:', error);
      } finally {
        this.isLoading = false;
      }
    },
    goBackRoute() {
      return this.$router.go(-1);
    },
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 0) this.quantity--;
    },
    toggleFavourite(product) {
      this.setFavList(product);
    },
    isFav() {
      return this.favourites[this.selectedProduct.id] != undefined;
    },
  },
};
</script>

<style src="@/assets/styles/components/product-detail.css"></style>
<style src="@/assets/styles/components/button.css"></style>
<style src="@/assets/styles/vendors/ratings.css"></style>
<style src="@/assets/styles/abstracts/root.css"></style>
<style src="@/assets/styles/components/loading.css"></style>
