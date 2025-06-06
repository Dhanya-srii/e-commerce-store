<template>
  <div class="brand">
    <input
      id="input"
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
  props: ['value', 'brandData'],

  data() {
    return {};
  },
  methods: {
    handleChange() {
      this.$emit('input', this.brandData);
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
