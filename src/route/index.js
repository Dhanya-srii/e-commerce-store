import Vue from 'vue';
import VueRouter from 'vue-router';

import { ROUTE_NAMES } from '@/constants/Routes';

import ProductsList from '@/components/ProductsList.vue';
import ProductDetails from '@/components/ProductDetails.vue';
import FavouriteProducts from '@/components/FavouriteProducts.vue';
import PageNotFound from '@/components/PageNotFound.vue';
import ProductCart from '@/components/ProductCartList.vue';

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    redirect: { name: ROUTE_NAMES.PRODUCTS },
  },
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
    path: '/product',
    component: ProductDetails,
    name: ROUTE_NAMES.PRODUCT_DETAIL,
  },
  {
    path: '/addCart',
    component: ProductCart,
    name: ROUTE_NAMES.PRODUCT_CART,
  },
  {
    path: '*',
    component: PageNotFound,
    name: ROUTE_NAMES.PAGE_NOT_FOUND,
  },
];
const router = new VueRouter({
  mode: 'history',
  routes,
});
export default router;
