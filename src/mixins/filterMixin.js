export default {
  filters: {
    initalCaps(value) {
      return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
    },
  },
};
