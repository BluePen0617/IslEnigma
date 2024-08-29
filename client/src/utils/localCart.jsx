class LocalCart {
  constructor() {
    this.cartKey = "cart"
    this.cartItems = this.getCartItems()
  }

  getCartItems() {
    const cartItems = localStorage.getItem(this.cartKey)
    return cartItems ? JSON.parse(cartItems) : []
  }

  saveCartItems() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems))
  }

  addToCart(newItem) {
    const existingItemIndex = this.cartItems.findIndex(
      (item) => item.order_item_id === newItem.order_item_id
    )

    if (existingItemIndex !== -1) {
      this.cartItems[existingItemIndex].quantity += newItem.quantity
    } else {
      this.cartItems.push(newItem)
    }

    this.saveCartItems()
  }

  updateCartItemQuantity(order_item_id, newQuantity) {
    const itemIndex = this.cartItems.findIndex(
      (item) => item.order_item_id === order_item_id
    )

    if (itemIndex !== -1) {
      this.cartItems[itemIndex].quantity = newQuantity
      this.saveCartItems()
    }
  }

  removeCartItem(order_item_id) {
    this.cartItems = this.cartItems.filter(
      (item) => item.order_item_id !== order_item_id
    )

    this.saveCartItems()
  }

  clearCart() {
    this.cartItems = []
    localStorage.removeItem(this.cartKey)
  }

  getItems() {
    return this.cartItems
  }
}
