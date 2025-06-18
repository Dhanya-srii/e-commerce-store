<template>
  <div>
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Loading product...</p>
    </div>
    <div v-else class="product-container">
      <button @click="goBackRoute" class="goBackBtn">Back</button>
      <div class="sub-images">
        <div
          class="sub-img-div"
          v-for="image in productData.images"
          :key="image"
        >
          <img class="sub-images" :src="image" alt="image" />
        </div>
      </div>

      <div class="main-image">
        <img :src="productData.images[0]" />
      </div>

      <div class="product-details">
        <p class="heading">EVERYDAY HUMANS</p>
        <h1 class="title">{{ productData.title }}</h1>
        <el-rate
          v-model="value"
          disabled
          show-score
          text-color="#ec9854"
          score-template="{value} points"
        ></el-rate>
        <p class="price">${{ productData.price }}</p>
        <p class="description">{{ productData.description }}</p>

        <div class="sub-details">
          <h2>Size:</h2>
          <div class="size-options">
            <button class="quantity">50ml</button>
            <button class="quantity">100ml</button>
          </div>

          <div class="btn-container">
            <div class="count">
              <button class="counter" @click="decrement">-</button>
              <p class="countValue">{{ count }}</p>
              <button class="counter" @click="count++">+</button>
            </div>
            <button class="addCart-details">Add to Cart</button>
            <button class="fav-detail" @click="setFavList(productData)">
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
  data() {
    return {
      value: 4.5,
      count: 0,
      productData: {},
      loading: true,
    };
  },
  computed: {
    ...mapState({
      favourites: (state) => state.storeProducts.favourites,
    }),
  },
  async created() {
    await this.displaySingleProduct();
  },
  methods: {
    async displaySingleProduct() {
      try {
        this.loading = true;
        this.productData = await products.fetchSingleProduct(
          this.$route.params.id
        );
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        this.loading = false;
      }
    },
    goBackRoute() {
      return this.$router.go(-1);
    },
    decrement() {
      if (this.count > 0) this.count--;
    },
    ...mapMutations(['setFavList']),
    isFav() {
      return this.favourites[this.productData.id] != undefined;
    },
  },
};
</script>

<style src="@/assets/styles/components/product-detail.css"></style>
<style src="@/assets/styles/components/button.css"></style>
<style src="@/assets/styles/vendors/ratings.css"></style>
<style src="@/assets/styles/abstracts/root.css"></style>
<style src="@/assets/styles/components/loading.css"></style>
