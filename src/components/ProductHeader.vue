<template>
  <div class="header">
    <div class="brand" @click="handleHome()">
      <h1>PLUGO</h1>
    </div>
    <div class="searchProduct">
      <input
        type="text"
        placeholder="Search..."
        v-model="userSearch"
        @keyup.enter="searchProduct()"
      />
      <button @click="searchProduct()" class="find">Find</button>
    </div>
    <div class="userProducts">
      <button class="fav" @click="listFavourites()">
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
    searchProduct() {
      const search = this.data.find(
        (s) => s.title.toLowerCase() === this.userSearch.toLowerCase()
      );
      this.userSearch = '';
      if (search) {
        this.$store.commit('getSearchedProduct', search);
        // console.log(search);
      } else {
        return;
      }
    },
  },
  computed: {
    favourites() {
      return this.$store.getters.getFavourites;
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: lato;
}
.header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  z-index: 1;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

button,
.brand {
  border: none;
  cursor: pointer;
}

input {
  border: none;
  background-color: rgb(240, 240, 240);
  font-size: 1.4rem;
  border-radius: 18px;
  padding: 0.5rem;
  width: 280px;
}
.userProducts {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}
.find {
  background-color: rgb(236, 152, 84);
  color: white;
  padding: 0.5rem;
  width: 100px;
  font-size: 1.2rem;
  border-radius: 18px;
  margin-left: 1rem;
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
  color: #ff0000;
}
</style>
