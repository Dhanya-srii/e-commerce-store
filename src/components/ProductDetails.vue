<template>
  <div
    v-if="isLoading"
    class="loading-container"
  >
    <div class="spinner"></div>
    <p>Loading product...</p>
  </div>
  <div
    v-else
    class="product-container"
  >
    <button
      @click="goBackRoute"
      class="back-button"
    >
      Back
    </button>
    <div class="sub-images">
      <div
        class="sub-img-div"
        v-for="image in selectedProduct.images"
        :key="image"
      >
        <img
          class="sub-images"
          :src="image"
          alt="image"
        />
      </div>
    </div>

    <div class="main-image-section">
      <img
        :src="selectedProduct.images[0]"
        alt="Product image"
      />
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
        <div class="action-buttons">
          <div @click="addCartProducts(selectedProduct)">
            <button class="addCart-details">Add to Cart</button>
          </div>
          <div class="quantity-controller">
            <div class="quantity-wrapper">
              <button class="counter-button">-</button>
              <span class="quantity-display">{{}}</span>
              <button class="counter-button">+</button>
            </div>
          </div>
          <button
            class="fav-detail"
            @click="toggleFavourite(selectedProduct)"
          >
            <i :class="[isFav ? 'ri-heart-fill' : 'ri-heart-line']"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { products } from '../api/products';
export default {
  name: 'ProductDetail',
  data() {
    return {
      selectedProduct: {},
      isLoading: true,
      value: 4.5,
    };
  },
  computed: {
    ...mapState({
      favouritesList: (state) => state.storeProducts.favouritesList,
    }),
    isFav() {
      return this.favouritesList[this.selectedProduct.id] != undefined;
    },
  },
  async created() {
    await this.getProductdata();
  },
  methods: {
    ...mapMutations(['updateFavList']),
    ...mapActions(['addCartProducts']),
    async getProductdata() {
      this.isLoading = true;
      try {
        const productId = this.$route.query.id;
        this.selectedProduct = await products.fetchProductData(productId);
      } finally {
        this.isLoading = false;
      }
    },
    goBackRoute() {
      this.$router.go(-1);
    },
    toggleFavourite(product) {
      this.updateFavList(product);
    },
  },
};
</script>

<style scoped src="@/assets/styles/components/product-detail.css"></style>
<style scoped src="@/assets/styles/components/button.css"></style>
<style scoped src="@/assets/styles/vendors/ratings.css"></style>
<style scoped src="@/assets/styles/abstracts/root.css"></style>
<style scoped src="@/assets/styles/components/loading.css"></style>
<style scoped src="@/assets/styles/components/ProductCart.css"></style>
