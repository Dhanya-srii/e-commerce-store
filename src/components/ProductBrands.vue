<template>
  <div class="brand">
    <input
      type="checkbox"
      :value="brandData"
      :checked="value === brandData"
      @change="handleChange"
    />
    <p>{{ brandData }}</p>
  </div>
</template>

<script>
export default {
  props: {
    brandData: String,
    value: String,
  },
  methods: {
    handleChange() {
      this.$emit('input', this.value === this.brandData ? '' : this.brandData);
    },
  },
};
</script>

<style scoped>
.brand {
  display: flex;
  gap: 1rem;
}
</style>
