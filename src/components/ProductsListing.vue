<template>
  <div>
    <div class="container">
      <div class="categoryAndBrandContainer">
        <div class="categories">
          <h1>Category</h1>
          <SelectableCheckbox
            v-for="(category, index) in uniqueCategories"
            :key="index"
            v-model="selectedCategories"
            :item="category"
          />
        </div>

        <div class="brands">
          <h1>Brand</h1>
          <div class="brand">
            <SelectableCheckbox
              v-for="(brand, index) in allBrandsForSelectedCategories"
              :key="index"
              :item="brand"
              v-model="selectedBrands"
            />
          </div>
        </div>
      </div>

      <div>
        <div class="filters">
          <div class="filterContainer">
            <span
              v-for="(category, Cindex) in selectedCategories"
              :key="'C' + Cindex"
              class="filter-pill"
            >
              <span>{{ category | firstLetterUpperCase }}</span>
              <button class="removeFilter" @click="removeCategory(category)">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </span>
            <span
              v-for="(brand, Bindex) in selectedBrands"
              :key="Bindex"
              class="filter-pill"
            >
              <span>{{ brand || 'All Groceries' | firstLetterUpperCase }}</span>
              <button class="removeFilter" @click="removeBrand(brand)">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </span>
          </div>
          <div>
            <button
              v-if="selectedCategories.length || selectedBrands.length"
              class="fixed-clear"
              @click="clearAll"
            >
              Clear All
            </button>
          </div>
        </div>

        <div v-if="filteredProducts.length" class="products">
          <ProductCards
            v-for="(product, index) in filteredProducts"
            :key="index"
            :data="product"
          />
        </div>
        <div v-else class="noProducts">
          <p class="message">{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { products } from '../api/products';
import ProductCards from './ProductCards.vue';
import SelectableCheckbox from './SelectableCheckBox.vue';
export default {
  components: {
    ProductCards,
    SelectableCheckbox,
  },
  filters: {
    firstLetterUpperCase(value) {
      return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
    },
  },
  data() {
    return {
      productList: [],
      uniqueCategories: [],
      selectedCategories: [],
      selectedBrands: [],
      brandsByCategory: {},
      message: '',
    };
  },

  computed: {
    ...mapGetters(['getSearchedProduct']),
    filteredProducts() {
      if (this.getSearchedProduct) {
        return [this.getSearchedProduct];
      }

      return this.productList.filter((p) => {
        const categoryMatch =
          !this.selectedCategories.length ||
          this.selectedCategories.includes(p.category);
        const brandMatch =
          !this.selectedBrands.length || this.selectedBrands.includes(p.brand);

        return categoryMatch && brandMatch;
      });
    },

    allBrandsForSelectedCategories() {
      const allBrands = new Set();

      if (!this.selectedCategories.length) {
        Object.values(this.brandsByCategory).forEach((brandList) => {
          brandList.forEach((b) => allBrands.add(b));
        });
      } else {
        this.selectedCategories.forEach((category) => {
          const brands = this.brandsByCategory[category] || [];

          brands.forEach((b) => allBrands.add(b));
        });
      }

      return [...allBrands];
    },
  },

  async created() {
    this.productList = await products.fetchAllProducts();
    // console.log(this.productList);

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
      // console.log(brandMap[category]);
    }

    this.brandsByCategory = brandMap;
  },
  methods: {
    clearAll() {
      (this.selectedCategories = []), (this.selectedBrands = []);
      this.$store.commit('getSearchedProduct', null);
    },
    removeCategory(cat) {
      this.selectedCategories = this.selectedCategories.filter(
        (c) => c !== cat
      );
    },
    removeBrand(brand) {
      this.selectedBrands = this.selectedBrands.filter((b) => b !== brand);
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
h1 {
  margin-bottom: 0.5rem;
}
.container {
  max-width: 1800px;
  margin: 5rem 0rem 0rem 5rem;
  display: flex;
  justify-content: center;
  position: relative;
}
.categoryAndBrandContainer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: fixed;
  left: 0%;
  margin: 16px;
  z-index: 1000;
  width: 240px;
  height: 855px;
}

.categories,
.brands {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-wrap: wrap;
}
.brand {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
::-webkit-scrollbar {
  width: 8px;
  height: 5px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: rgb(220, 171, 130);
}
::-webkit-scrollbar-thumb:hover {
  background: rgb(191, 118, 2);
}
.products,
.noProducts {
  display: grid;
  grid-template-columns: repeat(4, 250px);
  gap: 2.8rem;
  margin-top: 8rem;
  flex: 2;
}
.noProducts {
  font-size: 1.8rem;
  padding: 32px;
}

.filters {
  display: flex;
  background-color: rgba(110, 110, 109, 0.3);
  width: 1120px;
  align-items: center;
  z-index: 1001;
  position: fixed;
  padding: 2.2rem;
  border-radius: 16px;
  max-height: 10px;
}
.filterContainer {
  display: flex;
  overflow-x: scroll;
  flex-wrap: nowrap;
  width: calc(100% - 100px);
  overflow-y: hidden;
  align-items: center;
}
.filter-pill {
  background-color: #f0f0f0;
  color: #605e5e;
  border-radius: 8px;
  flex: 1;
  display: flex;
  align-items: center;
  height: 32px;
  flex-wrap: nowrap;
  margin: 4px;
  padding: 0.5rem;
  min-width: 150px;
  gap: 16px;
}

.removeFilter,
i {
  border: none;
  font-size: 1.3rem;
  color: #605e5e;
  font-weight: 700;
  cursor: pointer;
}
.fixed-clear {
  display: block;
  position: relative;
  width: 100px;
  color: rgb(236, 152, 84);
  border: none;
  font-weight: 500;
  font-size: 24px;
  cursor: pointer;
  background-color: rgba(236, 152, 84, 0.1);
  cursor: pointer;
}
</style>
