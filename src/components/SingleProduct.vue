<template>
  <div class="product-container">
    <button @click="goBackRoute" class="goBackBtn">go back</button>
    <div class="sub-images">
      <div class="sub-img" v-for="n in 6" :key="n"></div>
    </div>

    <div class="main-image">
      <img :src="productData.images" />
    </div>

    <div class="details">
      <p class="heading">EVERYDAY HUMANS</p>
      <h1 class="title">{{ productData.title }}</h1>
      <el-rate
        v-model="value"
        disabled
        show-score
        text-color="#ff9900"
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
          <button class="addCart">Add to Cart</button>
          <button class="fav" @click="updateFavList(productData)">
            <i
              class="fa-solid fa-heart"
              :style="{ color: isFav() ? 'red' : 'gray' }"
            ></i>
          </button>
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
    };
  },
  computed: {
    ...mapState({
      favourites: (state) => state.products.favourites,
    }),
  },
  async mounted() {
    await this.displaySingleProduct();
    console.log(this.productData.images['0']);
  },
  methods: {
    async displaySingleProduct() {
      try {
        this.productData = await products.fetchSingleProduct(
          this.$route.params.id
        );
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    },
    goBackRoute() {
      return this.$router.go(-1);
    },
    decrement() {
      if (this.count > 0) this.count--;
    },
    ...mapMutations(['updateFavList']),
    isFav() {
      return this.favourites[this.productData.id] != undefined;
    },
  },
};
</script>

<style src="@/assets/styles/components/product-detail.css"></style>
