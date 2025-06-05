<template>
  <div v-if="productList.length" class="container">
    <div class="categories">
      <ProductCategory
        v-for="(category, index) in uniqueCategories"
        :key="index"
        :categoryData="category"
        v-model="selectedCategory"
      />

      <ProductBrands
        v-for="(brand, index) in brandsByCategory[selectedCategory] || []"
        :key="index"
        :brandData="brand"
        v-model="selectedBrand"
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
</template>

<script>
import { products } from '../api/products';
import ProductCategory from './ProductCategory.vue';
import ProductBrands from './ProductBrands.vue';
import ProductCards from './ProductCards.vue';

export default {
  components: {
    ProductCategory,
    ProductBrands,
    ProductCards,
  },

  data() {
    return {
      productList: [],
      selectedCategory: '',
      selectedBrand: '',
      uniqueCategories: [],
      brandsByCategory: {},
    };
  },

  computed: {
    filteredProducts() {
      return this.productList.filter((p) => {
        const matchCategory =
          !this.selectedCategory || p.category === this.selectedCategory;
        const matchBrand =
          !this.selectedBrand || p.brand === this.selectedBrand;
        return matchCategory && matchBrand;
      });
    },
  },

  async created() {
    this.productList = await products.fetchAllProducts();

    const allCategories = this.productList.map((p) => p.category);
    this.uniqueCategories = [...new Set(allCategories)];

    this.brandsByCategory = this.productList.reduce((acc, product) => {
      const { category, brand } = product;
      if (!acc[category]) acc[category] = [];
      if (!acc[category].includes(brand)) acc[category].push(brand);
      return acc;
    }, {});
  },
};
</script>

<style>
.container {
  max-width: 1200px;
  margin: 5rem auto 0;
  padding: 1rem;
  display: flex;
  gap: 4rem;
}

.categories {
  display: flex;
  flex-direction: column;
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
