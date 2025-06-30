<template>
  <div class="cart-item">
    <div class="cart-item-image">
      <!-- <img alt="Product image" /> -->
      <span class="cart-item-stock"><i class="ri-check-line"></i>IN STOCK</span>
    </div>
    <div class="cart-item-content">
      <div class="cart-item-info">
        <h2 class="cart-item-title">Softride Premier Men's Slip-On Shoes</h2>
        <div class="cart-item-details">
          <p><span>Color:</span> High Risk Red-Puma Black</p>
          <p><span>Size:</span> UK 8</p>
          <p><span>Style number:</span> 311887_01</p>
        </div>
        <select class="cart-item-quantity">
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
      <div class="cart-item-side">
        <h3 class="cart-item-price">$699,999</h3>
        <div class="cart-item-actions">
          <button><i class="ri-edit-line"></i></button>
          <button><i class="ri-delete-bin-line"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e2dddd;
  height: 230px;
}

.cart-item-image {
  width: 20%;
  /* border: 1px solid black; */
  display: flex;
  background-color: #eeee;
  flex-direction: column;
  align-items: center;
}
.cart-item-stock {
  margin-top: 8px;
  font-size: 10px;
  text-align: center;
  color: #4d7d04;
  border: 1px solid #4d7d04;
  padding: 6px;
  background-color: #ffff;
  border-radius: 12px;
}
.cart-item-stock i {
  background-color: #4d7d04;
  color: var(--secondary-color);
  border-radius: 50%;
  margin: 4px;
}
.cart-item-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.cart-item-info {
  flex: 1;
}
.cart-item-title {
  font-size: 20px;
  margin-bottom: 16px;
}
.cart-item-details p {
  font-weight: 300;
  padding: 4px 0;
}
.cart-item-details p span {
  color: gray;
  font-weight: 200;
}

.cart-item-quantity {
  margin-top: 16px;
  padding: 16px 32px;
  font-size: 16px;
}

.cart-item-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
}
.cart-item-price {
  font-size: 18px;
}
.cart-item-actions button {
  border: none;
  background: none;
  font-size: 24px;
  margin: 4px 8px;
}
.cart-item-actions button i {
  font-weight: 300;
}
</style>
