export default {
  filters: {
    /**
     *
     * @param {*} value
     * @returns
     */
    initalCaps(value) {
      return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
    },
    toUpperCase(value) {
      return value.toUpperCase();
    },
  },
};
