export const parseProduct = {
  parseDailyProducts: (product) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    images: product.images,
    description: product.description,
  }),
};
