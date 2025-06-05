<template>
  <div class="category">
    <input
      type="checkbox"
      :value="data"
      :checked="value === data"
      @change="handleChange"
    />
    {{ data }}
  </div>
</template>

<script>
export default {
  props: {
    data: String,
    value: String,
  },
  methods: {
    handleChange() {
      if (this.value === this.data) {
        this.$emit('input', '');
      } else {
        this.$emit('input', this.data);
      }
    },
  },
};
</script>
