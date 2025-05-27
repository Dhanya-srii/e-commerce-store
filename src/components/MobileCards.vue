<template>
  <div>
    <div v-if="datas.length" class="container">
      <div class="products">
        <ProductDisplay
          :data="data"
          v-for="(data, index) in datas"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getData } from "../Api/ProductsApi";
import ProductDisplay from "./ProductDisplay.vue";
export default {
  data() {
    return {
      datas: "",
    };
  },
  components: {
    ProductDisplay,
  },
  async created() {
    this.datas = await getData();
  },
};
</script>
