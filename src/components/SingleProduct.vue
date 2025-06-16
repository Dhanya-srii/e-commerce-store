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

<style scoped>
@import url('//unpkg.com/element-ui@2.15.14/lib/theme-chalk/index.css');


.product-container {
  max-width: 1300px;
  min-height: 85vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: auto;
  gap: 2rem;
  padding: 2rem;
  margin-top: 5rem;
}
.goBackBtn {
  width: 85px;
  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 8px;
}

.goBackBtn:hover {
  border: 2px solid #ec9854;
}

.sub-images {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 150px;
}

.sub-img {
  height: 100px;
  width: 100%;
  background-color: #f0f0f0;
}

.main-image {
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 680px;
}

.main-image img {
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
}

.details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: ease 1s;
}

.heading {
  color: grey;
  font-size: 0.9rem;
}

.title {
  color: #42324f;
  font-size: 2.5rem;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
}

.description {
  color: #808080;
  font-size: 1rem;
}

.size-options {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

button {
  border: none;
  cursor: pointer;
}

.quantity {
  flex: 1;
  padding: 0.5rem;
  border-radius: 12px;
  font-size: 1rem;
  background-color: #ffffff;
  border: 1px solid #ccc;
}

.quantity:hover {
  background-color: #f8f8f8;
  border-color: #ec9854;
}

.btn-container {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 1rem;
}

.count {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ec9854;
  border-radius: 12px;
  width: 120px;
  height: 40px;
  padding: 0 0.5rem;
}

.counter {
  background: none;
  font-size: 1.5rem;
}

.countValue {
  font-size: 1.2rem;
}

.addCart {
  background-color: #ec9854;
  color: white;
  padding: 0.5rem 5rem;
  border-radius: 24px;
  font-size: 1rem;
}
.fav {
  background-color: #d8d5d5;
  color: #636161;
  font-size: 1.5rem;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fav:hover {
  color: red;
}
</style>
