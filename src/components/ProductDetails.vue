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
          <div v-if="quantity === 0">
            <button
              class="addCart-details"
              @click="handleAddToCart"
            >
              Add to Cart
            </button>
          </div>
          <div
            v-else
            class="quantity-controller"
          >
            <div class="quantity-wrapper">
              <button
                class="counter-button"
                @click="updateQuantity(quantity - 1)"
              >
                -
              </button>
              <span class="quantity-display">{{ quantity }}</span>
              <button
                class="counter-button"
                @click="updateQuantity(quantity + 1)"
              >
                +
              </button>
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
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
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
    ...mapGetters(['cartQuantity']),
    isFav() {
      return this.favouritesList[this.selectedProduct.id] != undefined;
    },
    quantity() {
      return this.cartQuantity(this.selectedProduct.id);
    },
  },
  async created() {
    await this.getProductdata();
  },
  methods: {
    ...mapMutations(['updateFavList']),
    ...mapActions(['addToCart', 'changeQuantity']),

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
    handleAddToCart() {
      this.addToCart(this.selectedProduct);
    },
    updateQuantity(newQuantity) {
      this.changeQuantity({
        id: this.selectedProduct.id,
        quantity: newQuantity,
      });
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
