<template>
  <div class="product">
    <div class="image">
      <button class="fav"><i class="fa-solid fa-heart"></i></button
      ><img :src="data.images" alt="product image" />
    </div>
    <div>
      <h3>{{ data.title }}</h3>
      <div class="flex">
        <p class="price">${{ data.price }}</p>
        <button class="addCart">+ Add</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // props: {
  //   datas: {
  //     type:Array,
  //     required: true,
  //   },
  // },
  props: ["data"],
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: lato;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
}
.products {
  display: grid;
  grid-template-columns: repeat(4, 250px);
  gap: 2.8rem;
  flex: 1;
}
.product {
  border-radius: 26px;
  max-height: 450px;
  text-align: center;
  max-width: 280px;
}

.image {
  background-color: rgb(243, 241, 241);
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
  font-size: 1.3rem;
  margin: 1rem;
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
  background-color: rgb(252, 166, 5);
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
.fav :hover {
  color: rgb(224, 32, 32);
}
</style>
