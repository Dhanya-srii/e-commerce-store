<template>
  <div
    v-if="isLoggedIn && toggleFilter"
    class="modal-filter-container"
    @click="toggleFilter"
  >
    <div
      class="filters-panel display-flex"
      @click.stop
    >
      <loading-data v-if="isLoading" />

      <div
        v-else
        class="categories display-flex"
      >
        <div
          class="filters-panel-header display-flex align-items-center justify-content-space-between"
        >
          <p class="filters-panel-title">Product Filters</p>
          <button
            @click="toggleFilter"
            class="close-filter"
          >
            <i class="ri-close-large-line"></i>
          </button>
        </div>

        <div class="filters-panel-body display-flex">
          <p class="custom">Category</p>

          <div
            v-for="(category, index) in categoryList"
            :key="index"
            class="selectable-item display-flex"
          >
            <el-checkbox
              :label="category.slug"
              v-model="originalCategoriesLocal"
              class="custom"
            >
              {{ category.slug }}
            </el-checkbox>
          </div>
        </div>

        <div
          class="filter-panel-footer display-flex align-items-center justify-content-center"
        >
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
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex';
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
    ...mapGetters(['isLoggedIn']),
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

<style lang="scss" scoped src="@/styles/layout/products.scss"></style>
<style lang="scss" scoped src="@/styles/components/button.scss"></style>
<style
  lang="scss"
  scoped
  src="@/styles/components/elementsVariable.scss"
></style>
<style lang="scss" src="@/styles/components/elementsVariable.scss"></style>
<style lang="scss" scoped src="@/styles/components/modal.scss"></style>
<style lang="scss" src="@/styles/components/modal.scss"></style>
<style lang="scss" scoped src="@/styles/abstracts/root.scss"></style>
