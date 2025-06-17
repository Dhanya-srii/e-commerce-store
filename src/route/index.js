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
    path: '/products/search',
    component: ProductsListing,
    name: 'ProductListing',
  },
  {
    path: '/product/:id',
    component: SingleProduct,
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
