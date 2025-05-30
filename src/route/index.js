import Vue from 'vue';
import VueRouter from 'vue-router';
import ProductsListing from '@/components/ProductsListing.vue';
import SingleProduct from '@/components/SingleProduct.vue';
import FavouriteProducts from '@/components/FavouriteProducts.vue';
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    redirect: { name: 'ProductsListing' },
  },
  {
    path: '/products',
    component: ProductsListing,
    name: 'ProductsListing',
  },
  {
    path: '/favourites',
    component: FavouriteProducts,
    name: 'FavouriteProducts',
  },
  {
    path: '/product/:id',
    component: SingleProduct,
  },
];
const router = new VueRouter({
  mode: 'history',
  routes,
});
export default router;



// Got it! You want the **heart icon to act as a toggle** in both:

// 1. The product listing page (`ProductCards.vue`)
// 2. The favourites page (`Favourites.vue`)

// And:

// * No need to **store favourites in localStorage**
// * Just maintain in-memory data using **EventBus**
// * Toggle logic should also remove from favourites when clicked again

// ---

// ### ✅ Solution Overview

// We’ll do the following:

// #### 1. In `ProductCards.vue`:

// * Emit product via EventBus when toggled.
// * On second click, emit it again to remove from favourites.

// #### 2. In `Favourites.vue`:

// * Maintain a favourites array.
// * On each toggle, check:

//   * If product exists → remove it
//   * If not → add it

// ---

// ### 🔧 1. `ProductCards.vue` – Update heart icon toggle

// ```vue
// <template>
//   <div class="product" @click="handleSingleProduct(data.id)">
//     <div class="image">
//       <button class="fav" @click.stop="toggleFav">
//         <i class="fa-solid fa-heart" :style="{ color: isFav ? 'red' : 'gray' }"></i>
//       </button>
//       <img :src="data.images" alt="product image" />
//     </div>
//     <div>
//       <h3>{{ data.title | uppercase }}</h3>
//       <div class="flex">
//         <p class="price">${{ data.price }}</p>
//         <button @click.stop class="addCart">+ Add</button>
//       </div>
//     </div>
//   </div>
// </template>

// <script>
// import { EventBus } from '../main';

// export default {
//   props: ["data"],
//   data() {
//     return {
//       isFav: false,
//     };
//   },
//   methods: {
//     handleSingleProduct(id) {
//       this.$router.push(`/product/${id}`);
//     },
//     toggleFav() {
//       this.isFav = !this.isFav;
//       EventBus.$emit("toggle-favourite", {
//         id: this.data.id,
//         title: this.data.title,
//         price: this.data.price,
//         image: this.data.images,
//       });
//     },
//   },
//   filters: {
//     uppercase(value) {
//       if (!value) return "";
//       return value.toUpperCase();
//     },
//   },
// };
// </script>
// ```

// ---

// ### 🔧 2. `Favourites.vue` – Show favourites with toggle

// ```vue
// <template>
//   <div>
//     <h1>I'm from favourites</h1>

//     <div v-if="favourites.length">
//       <div v-for="item in favourites" :key="item.id" style="border:1px solid gray; padding:1rem; margin:1rem;">
//         <img :src="item.image" style="width: 100px;" />
//         <p>{{ item.title }}</p>
//         <p>${{ item.price }}</p>
//         <button class="fav" @click="toggleFav(item.id)">
//           <i class="fa-solid fa-heart" style="color: red;"></i>
//         </button>
//       </div>
//     </div>
//     <div v-else>
//       <p>No favourites yet!</p>
//     </div>
//   </div>
// </template>

// <script>
// import { EventBus } from '../main';

// export default {
//   data() {
//     return {
//       favourites: [],
//     };
//   },
//   mounted() {
//     EventBus.$on("toggle-favourite", (product) => {
//       const index = this.favourites.findIndex((item) => item.id === product.id);
//       if (index === -1) {
//         this.favourites.push(product);
//       } else {
//         this.favourites.splice(index, 1);
//       }
//     });
//   },
//   methods: {
//     toggleFav(id) {
//       const item = this.favourites.find((f) => f.id === id);
//       if (item) {
//         EventBus.$emit("toggle-favourite", item);
//       }
//     },
//   },
// };
// </script>

// <style scoped>
// .fav {
//   background: transparent;
//   border: none;
//   font-size: 1.5rem;
//   cursor: pointer;
// }
// </style>
// ```

// ---

// ### ✅ Summary

// * ✅ Clicking heart in **products** adds/removes from favourites
// * ✅ Clicking heart in **favourites page** removes item
// * ✅ Everything stays in memory using `EventBus`
// * ✅ No localStorage or backend required

// Let me know if you want a small heart animation or tooltip ("Add to Favourites" / "Remove") too!
