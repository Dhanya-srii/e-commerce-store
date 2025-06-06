<template>
  <div>
    <div v-if="productList.length" class="container">
      <div class="categories">
        <ProductCategory
          v-for="(category, index) in uniqueCategories"
          :key="index"
          :categoryData="category"
          v-model="selectedCategory"
        />
      </div> 
      <div class="brands">
        <ProductBrands
          v-for="(brand, index) in brandsByCategory[selectedCategory] || []"
          :key="index"
          :brandData="brand"
          v-model="selectedBrands"
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
import ProductBrands from './ProductBrands.vue';
export default {
  components: {
    ProductCards,
    ProductCategory,
    ProductBrands,
  },

  data() {
    return {
      productList: [],
      uniqueCategories: [],
      selectedCategory: '',
      selectedBrands: '',
      brandsByCategory: {},
    };
  },

  computed: {
    filteredProducts() {
      if (!this.selectedCategory) return this.productList;
      return this.productList.filter((p) => {
        const categoryMatch = p.category === this.selectedCategory;

        console.log(this.selectedBrands);

        const brandMatch = this.selectedBrands.includes(p.brand);
        if (!this.selectedBrands) {
          return categoryMatch;
        }
        return categoryMatch && brandMatch;
      });
    },
  },
  async created() {
    this.productList = await products.fetchAllProducts();

    const allCategories = this.productList.map((p) => p.category);
    this.uniqueCategories = [...new Set(allCategories)];

    const brandMap = {};
    this.productList.forEach(({ category, brand }) => {
      if (!brandMap[category]) {
        brandMap[category] = new Set();
      }
      brandMap[category].add(brand);
    });

    for (const category in brandMap) {
      brandMap[category] = [...brandMap[category]];
    }

    this.brandsByCategory = brandMap;
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
  gap: 4rem;
  /* flex-direction: column; */
}

.categories,
.brands {
  margin-bottom: 2rem;
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
