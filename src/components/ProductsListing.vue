<template>
  <div>
    <div v-if="productList.length" class="container">
      <div class="categories">
        
        <ProductCategory
          v-for="(category, index) in uniqueCategories"
          :key="index"
          :data="category"
          v-model="selectedCategory"
        />
      </div>

      <div class="products">
        <ProductCards
          v-for="(product, index) in filteredProducts"
          :key="index"
          :data="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { products } from '../api/products';
import ProductCards from './ProductCards.vue';
import ProductCategory from './ProductCategory.vue';

export default {
  components: {
    ProductCards,
    ProductCategory,
  },

  data() {
    return {
      productList: [],
      uniqueCategories: [],
      selectedCategory: '',
    };
  },

  computed: {
    filteredProducts() {
      console.log(this.selectedCategory);

      if (!this.selectedCategory) return this.productList;
      return this.productList.filter(
        (p) => p.category === this.selectedCategory
      );
    },
  },

  async created() {
    this.productList = await products.fetchAllProducts();
    const allCategories = this.productList.map((p) => p.category);
    this.uniqueCategories = [...new Set(allCategories)];
  },
};
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.categories {
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.products {
  display: grid;
  grid-template-columns: repeat(4, 250px);
  gap: 2.8rem;
  flex: 2;
}
</style>
