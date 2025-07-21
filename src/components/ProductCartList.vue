<template>
  <div class="cart">
    <p class="product-status-message" v-if="getAddedCartProducts.products.length === 0">No items in cart.</p>
    <div
      v-else
      class="cart-wrapper"
    >
      <p class="cart-title">
        {{ 'My Shopping Cart' }}
        <span class="item-count"
          >({{ getAddedCartProducts.products.length || 0 }})</span
        >
      </p>

      <div class="cart-content">
        <div class="cart-items">
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
            {{ 'Free returns on all qualifying orders' }}
          </p>
          <select class="promo-select">
            <option value="">{{ 'Apply a promo card' }}</option>
          </select>

          <div class="order-breakdown">
            <p class="discount-info">
              <span>{{ 'Extra 15% off applied' }}</span>
              <span class="discount-amount">{{
                (
                  getAddedCartProducts.total -
                  getAddedCartProducts.discountedTotal
                ).toFixed(2)
              }}</span>
            </p>
            <div class="price-details">
              <p>
                <span>{{ 'Subtotal' }}</span>
                <span>${{ getAddedCartProducts.total.toFixed(2) }}</span>
              </p>
              <p>
                <span>{{ 'shipping costs' }}</span>
                <span>Free</span>
              </p>
              <p>
                <span>{{ 'order discount' }}</span>
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

          <div class="total">
            <h3>
              {{ 'Grand Total' }}
              <span class="gst-note">{{ 'Prices include GST' }}</span>
            </h3>
            <h3>${{ getAddedCartProducts.discountedTotal }}</h3>
          </div>

          <button class="checkout-button">
            {{ 'Checkout' }}
          </button>
          <p class="terms-text">
            By continuing, I confirm that I have read and accept the
            <a href="#">Terms and Conditions</a> and the
            <a href="#">Privacy Policy</a>.
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

<style lang="scss" scoped src="@/styles/components/ProductCartList.scss"></style>
<style lang="scss" scoped src="@/styles/layout/base-products.scss"></style>
