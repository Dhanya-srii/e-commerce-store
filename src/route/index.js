import Vue from 'vue';
import VueRouter from 'vue-router';

import { ROUTE_NAMES } from '@/constants/Routes';

import ProductsList from '@/components/ProductsList.vue';
import ProductDetails from '@/components/ProductDetails.vue';
import FavouriteProducts from '@/components/FavouriteProducts.vue';

Vue.use(VueRouter);
const routes = [
  // {
  //   path: '/',
  //   // redirect: { component: ProductsList },
  // },
  {
    path: '/products',
    component: ProductsList,
    name: ROUTE_NAMES.PRODUCTS,
  },
  {
    path: '/favourites',
    component: FavouriteProducts,
    name: ROUTE_NAMES.FAVOURITE_PRODUCTS,
  },

  {
    path: 'product/:id',
    component: ProductDetails,
    name: ROUTE_NAMES.PRODUCT_DETAIL,
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
