import Vue from 'vue';
import VueRouter from 'vue-router';
import ProductsList from '@/components/ProductsList.vue';
import ProductDetails from '@/components/ProductDetails.vue';
import FavouriteProducts from '@/components/FavouriteProducts.vue';

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    redirect: { name: 'ProductsList' },
  },
  {
    path: '/products',
    component: ProductsList,
    name: 'ProductsList',
  },
  {
    path: '/favourites',
    component: FavouriteProducts,
    name: 'FavouriteProducts',
  },

  {
    path: '/product/:id',
    component: ProductDetails,
    name: 'ProductDetails',
  },

  {
    path: '*',
    redirect: '/products',
  },
];
const router = new VueRouter({
  mode: 'history',
  routes,
});
export default router;
