<template>
  <div class="selectable-item">
    <input
      type="checkbox"
      :value="item"
      :checked="isChecked"
      @change="handleChange"
      class="checkbox"
    />
    <label for="checkbox" class="item">{{
      item || 'All groceries' | firstLetterUpperCase
    }}</label>
  </div>
</template>

<script>
export default {
  filters: {
    firstLetterUpperCase(value) {
      return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
    },
  },
  // data() {
  //   return {
  //     id: 0,
  //   };
  // },
  props: {
    value: {
      type: Array,
    },
    item: {
      type: String,
    },
  },
  computed: {
    isChecked() {
      // console.log(this.item);
      return this.value.includes(this.item);
    },
  },
  methods: {
    handleChange(event) {
      const updated = [...this.value];

      if (event.target.checked && !updated.includes(this.item)) {
        updated.push(this.item);
      } else if (!event.target.checked && updated.includes(this.item)) {
        const index = updated.indexOf(this.item);
        updated.splice(index, 1);
      }
      this.$emit('input', updated);
    },
  },
};
</script>
<style src="@/assets/styles/components/selectable-item.css"></style>
