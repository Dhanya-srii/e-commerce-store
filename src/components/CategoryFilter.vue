<template>
  <div
    class="filter-container"
    @click="toggleFilter"
  >
    <div
      class="filters-panel"
      @click.stop
    >
      <div
        v-if="isLoading"
        class="loading-container"
      >
        <div class="spinner"></div>
        <p>Loading products...</p>
      </div>
      <div
        v-else
        class="categories"
      >
        <div class="filters-panel-header">
          <h3>Product Filters</h3>
          <button
            @click="toggleFilter"
            class="close-filter"
          >
            <i class="ri-close-large-line"></i>
          </button>
        </div>
        <div class="filters-panel-body">
          <div>
            <h3 class="custom">Category</h3>
          </div>

          <div
            v-for="(category, index) in categoryList"
            :key="index"
            class="selectable-item"
          >
            <el-checkbox
              :label="category"
              v-model="originalCategoriesLocal"
              class="custom"
            >
              {{ category | initalCaps }}
            </el-checkbox>
          </div>
        </div>
        <div class="filter-panel-footer">
          <button
            class="clear-all"
            v-if="originalCategories.length > 0"
            @click="clearFilters"
          >
            <span>Clear All</span> <i class="ri-close-circle-line"></i>
          </button>
          <button
            class="apply-filter"
            @click="applyFilters"
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import filterMixin from '../mixins/filterMixin';
import { products } from '../api/products';

export default {
  mixins: [filterMixin],
  data() {
    return {
      categoryList: [],
      isLoading: true,
      originalCategoriesLocal: [],
    };
  },
  computed: {
    ...mapState({
      showFilter: (state) => state.storeProducts.showFilter,
      originalCategories: (state) => state.storeProducts.selectedCategories,
    }),
  },

  async created() {
    try {
      this.isLoading = true;
      const categoryData = await products.fetchProductCategoriesList();
      this.categoryList = categoryData;
      this.originalCategoriesLocal = [...this.originalCategories];
    } catch (err) {
      alert('Error loading products:', err);
    } finally {
      this.isLoading = false;
    }
  },

  methods: {
    ...mapMutations([
      'setSelectedCategories',
      'clearSelectedCategories',
      'toggleFilter',
    ]),
    ...mapActions(['getAllProductsByCategories']),

    clearFilters() {
      this.originalCategoriesLocal = [];
      this.clearSelectedCategories();
      this.getAllProductsByCategories();
    },

    applyFilters() {
      this.setSelectedCategories(this.originalCategoriesLocal);
      this.toggleFilter();
      this.getAllProductsByCategories();
    },
  },
};
</script>

<style scoped src="@/assets/styles/layout/products.css"></style>
<style scoped src="@/assets/styles/components/button.css"></style>
<style scoped src="@/assets/styles/components/loading.css"></style>
<style scoped src="@/assets/styles/components/elementsVariable.css"></style>
<style scoped>
.filter-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(10, 10, 10, 0.4);
  z-index: 999;
}
</style>
