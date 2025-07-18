<template>
  <div
    class="modal-filter-container"
    @click="toggleFilter"
  >
    <div
      class="filters-panel"
      @click.stop
    >
      <loading-data v-if="isLoading" />

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
          <h3 class="custom">Category</h3>

          <div
            v-for="(category, index) in categoryList"
            :key="index"
            class="selectable-item"
          >
            <el-checkbox
              :label="category.slug"
              v-model="originalCategoriesLocal"
              class="custom"
            >
              {{ category.slug  }}
            </el-checkbox>
          </div>
        </div>

        <div class="filter-panel-footer">
          <button
            class="clear-all"
            v-if="originalCategories.length > 0"
            @click="clearFilters"
          >
            <span>Clear All</span>
            <i class="ri-close-circle-line"></i>
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
import { products } from '../api/products';
import LoadingData from './LoadingData.vue';
export default {
  data() {
    return {
      categoryList: [],
      isLoading: true,
      originalCategoriesLocal: [],
    };
  },
  components: {
    LoadingData,
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
      const categoryData = await products.fetchCategoryNames();
      this.categoryList = categoryData;
      this.originalCategoriesLocal = [...this.originalCategories];
    } catch (err) {
      alert('Error loading products: ' + err.message);
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

    applyFilters() {
      this.setSelectedCategories(this.originalCategoriesLocal);
      this.toggleFilter();
      this.getAllProductsByCategories();
    },

    clearFilters() {
      this.originalCategoriesLocal = [];
      this.clearSelectedCategories();
      this.getAllProductsByCategories();
      this.getAllProducts();
    },
  },
};
</script>

<style scoped src="@/styles/layout/products.css"></style>
<style scoped src="@/styles/components/button.css"></style>
<style scoped src="@/styles/components/elementsVariable.css"></style>
<style src="@/styles/components/elementsVariable.css"></style>

<style scoped>
.modal-filter-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(10, 10, 10, 0.4);
  z-index: 999;
}
</style>
