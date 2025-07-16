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
      <i class="ri-arrow-left-line"></i>
    </button>
    <div class="sub-images">
      <div
        class="sub-img-div"
        v-for="image in selectedProduct.images"
        :key="image"
      >
        <img
          class="sub-image"
          :src="image"
          alt="image"
          @click="handleHeroImage(image)"
        />
      </div>
    </div>

    <div class="main-image-section">
      <img
        :src="heroImage || selectedProduct.images[0]"
        alt="Product image"
      />
    </div>

    <div class="product-details">
      <p class="brand-title">EVERYDAY HUMANS</p>
      <h1 class="product-title">{{ selectedProduct.title }}</h1>
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
          <div v-if="!amount">
            <button
              class="addCart-details"
              @click="updateCart(selectedProduct)"
            >
              Add to Cart
            </button>
          </div>
          <div
            class="addCart-details"
            v-else
          >
            <button
              class="counter-button"
              @click="
                updateCart({ id: selectedProduct.id, quantityChange: -1 })
              "
            >
              -
            </button>

            <span>{{ amount }}</span>
            <button
              class="counter-button"
              @click="updateCart({ id: selectedProduct.id, quantityChange: 1 })"
            >
              +
            </button>
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
      heroImage: '',
    };
  },
  computed: {
    ...mapState({
      favouritesList: (state) => state.storeProducts.favouritesList,
      cartProducts: (state) => state.storeProducts.cartData.products,
    }),

    isFav() {
      return this.favouritesList[this.selectedProduct.id] != undefined;
    },

    amount() {
      const product = this.cartProducts?.find(
        (p) => p.id === this.selectedProduct.id
      );
      return product ? product.quantity : 0;
    },
  },

  async created() {
    await this.getProductdata();
  },

  methods: {
    ...mapMutations(['updateFavList']),
    ...mapActions(['addCartProducts', 'updateCart']),
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
    handleHeroImage(e) {
      this.heroImage = e;
    },
  },
};
</script>

<style scoped src="@/assets/styles/components/product-detail.css"></style>

<style scoped src="@/assets/styles/components/button.css"></style>
<style scoped src="@/assets/styles/vendors/ratings.css"></style>
<style scoped src="@/assets/styles/abstracts/root.css"></style>
<style scoped src="@/assets/styles/components/loading.css"></style>
