import Vue from "vue";
import VueRouter from "vue-router";
import ProductsListing from "@/components/ProductsListing.vue";
import SingleProduct from "@/components/SingleProduct.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: { name: "ProductsListing" },
  },
  {
    path: "/products",
    component: ProductsListing,
    name: "ProductsListing",
  },
  {
    path: "/product/:id",
    component: SingleProduct,
  },
];
const router = new VueRouter({
  mode: "history",
  routes,
});
export default router;
