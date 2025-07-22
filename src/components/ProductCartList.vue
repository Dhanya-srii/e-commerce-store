<template>
  <div class="cart display-flex align-items-center justify-content-center">
    <p
      class="product-status-message"
      v-if="getAddedCartProducts.products.length === 0"
    >
      No items in cart.
    </p>
    <div
      v-else
      class="cart-wrapper display-flex flex-direction-column"
    >
      <p class="cart-title">
        My Shopping Cart
        <span class="item-count"
          >({{ getAddedCartProducts.products.length || 0 }})</span
        >
      </p>

      <div class="cart-content display-flex">
        <div class="cart-items display-flex flex-direction-column">
          <product-cart
            v-for="product in getAddedCartProducts.products"
            :key="product.id"
            :product="product"
          />
        </div>

        <div class="cart-summary">
          <p class="free-shipping">
            <i class="ri-truck-line"></i>
            {{ "You've earned free shipping" }}
          </p>
          <p class="free-returns">
            <i class="ri-clockwise-line"></i>
            Free returns on all qualifying orders
          </p>
          <select class="promo-select">
            <option value="">Apply a promo card</option>
          </select>

          <div class="order-breakdown">
            <p class="discount-info display-flex justify-content-space-between">
              <span class="discount-title">Extra 15% off applied</span>
              <span class="discount-amount">{{
                (
                  getAddedCartProducts.total -
                  getAddedCartProducts.discountedTotal
                ).toFixed(2)
              }}</span>
            </p>
            <div class="price-details">
              <p
                class="sub-price-details display-flex justify-content-space-between"
              >
                <span>Subtotal</span>
                <span>${{ getAddedCartProducts.total.toFixed(2) }}</span>
              </p>
              <p
                class="sub-price-details display-flex justify-content-space-between"
              >
                <span>shipping costs</span>
                <span>Free</span>
              </p>
              <p
                class="sub-price-details display-flex justify-content-space-between"
              >
                <span>order discount</span>
                <span
                  >${{
                    (
                      getAddedCartProducts.total -
                      getAddedCartProducts.discountedTotal
                    ).toFixed(2)
                  }}</span
                >
              </p>
            </div>
          </div>

          <div class="total display-flex justify-content-space-between">
            <p>
              Grand Total
              <span class="gst-note">Prices include GST</span>
            </p>
            <p>${{ getAddedCartProducts.discountedTotal }}</p>
          </div>

          <button class="checkout-button">Checkout</button>
          <p class="terms-text">
            By continuing, I confirm that I have read and accept the
            <a
              class="condition"
              href="#"
              >Terms and Conditions</a
            >
            and the
            <a
              class="condition"
              href="#"
              >Privacy Policy</a
            >.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCart from './ProductCart.vue';
import { mapState } from 'vuex';
export default {
  name: 'ProductCartList',
  components: { ProductCart },
  computed: {
    ...mapState({
      getAddedCartProducts: (state) => state.storeProducts.cartData,
    }),
  },
};
</script>

<style
  lang="scss"
  scoped
  src="@/styles/components/ProductCartList.scss"
></style>
<style lang="scss" scoped src="@/styles/layout/base-products.scss"></style>
<style lang="scss" src="@/styles/components/button.scss" scoped></style>
