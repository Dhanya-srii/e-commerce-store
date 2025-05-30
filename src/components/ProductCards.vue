<template>
  <div class="product" @click="toSingleProduct(data.id)">
    <div class="image">
      <button class="fav" @click.stop>
        <i class="fa-solid fa-heart"></i></button
      ><img :src="data.images" alt="product image" />
    </div>
    <div>
      <div>
        <h3>{{ data.title | uppercase }}</h3>
      </div>
      <div class="flex">
        <p class="price">${{ data.price }}</p>
        <button @click.stop class="addCart">+ Add</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {};
  },
  filters: {
    uppercase: function (value) {
      if (!value) return "";
      return value.toUpperCase();
    },
  },
  methods: {
    toSingleProduct(id) {
      this.$router.push(`/product/${id}`);
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

.product {
  border-radius: 26px;
  max-height: 450px;
  text-align: center;
  max-width: 280px;
}

.image {
  background-color: rgb(240, 240, 240);
  border-radius: 26px;
  overflow: hidden;
  position: relative;
}
img {
  padding: 1rem;
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.product h3 {
  font-size: 1.1rem;
  margin: 1.3rem;
  height: 55px;
}

.product .price {
  font-size: 1.3rem;
  font-weight: 800;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
}
.addCart {
  border: none;
  background-color: rgb(236, 152, 84);
  color: white;
  padding: 0.5em 1.2rem;
  font-size: 1.2rem;
  border-radius: 32px;
  cursor: pointer;
}
.fav {
  position: absolute;
  right: 0;
  background-color: rgb(216, 213, 213);
  font-size: 1.4rem;
  padding: 0.5rem;
  color: rgb(99, 97, 97);
  margin: 1rem;
  font-weight: 300;
  cursor: pointer;
  border: none;
  border-radius: 50%;
}
.fav:hover {
  color: rgb(224, 32, 32);
}
</style>
