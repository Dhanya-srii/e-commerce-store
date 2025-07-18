<template>
  <div class="product-specifications">
    <div class="product-length">
      <h4>{{ totalProducts }} PRODUCTS</h4>
    </div>
    <div>
      <button
        :class="[
          'grid-button',
          { active: gridColumns === setGridView.TWO_COLUMNS },
        ]"
        @click="setGridColumns(setGridView.TWO_COLUMNS)"
      >
        <i class="ri-layout-grid-line"></i>
      </button>
      <button
        :class="[{ active: gridColumns === setGridView.FOUR_COLUMNS }]"
        @click="setGridColumns(setGridView.FOUR_COLUMNS)"
      >
        <i class="ri-layout-grid-2-line"></i>
      </button>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import { SET_GRID_VIEW } from '../constants/ProductGrid';
export default {
  props: {
    totalProducts: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      setGridView: SET_GRID_VIEW,
    };
  },

  computed: {
    ...mapState({
      gridColumns: (state) => state.storeProducts.gridColumns,
    }),
  },
  methods: {
    ...mapMutations(['setGridColumns']),
  },
};
</script>
<style lang="scss" scoped src="@/styles/components/button.scss"></style>
<style lang="scss" scoped src="@/styles/components/visualSize.scss"></style>
<style lang="scss" scoped>
button.active {
  border: 1px solid #333;
}
</style>
