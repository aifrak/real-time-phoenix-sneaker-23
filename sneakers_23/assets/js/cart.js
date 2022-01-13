const Cart = {}
export default Cart

Cart.setupCartChannel = (socket, cartId, { onCartChange }) => {
  const cartChannel = socket.channel(`cart:${cartId}`, channelParams)
  const onCartChangeFn = (cart) => {
    console.debug("Cart received", cart)
    localStorage.storedCart = cart.serialized
    onCartChange(cart)
  }

  cartChannel.on("cart", onCartChangeFn)
  cartChannel.join().receive("error", () => {
    console.error("Cart join failed")
  })

  return {
    cartChannel,
    onCartChange: onCartChangeFn
  }
}

// It's crucial that these parameters are calculated each time the Channel tries
// to reconnect. If we used a static channelParams value, then we'd find
// ourselves in a situation where a cart resets each time the Channel reconnects.
function channelParams() {
  return {
    serialized: localStorage.storedCart,
    page: window.location.pathname
  }
}

Cart.addCartItem = ({ cartChannel, onCartChange }, itemId) => {
  cartRequest(cartChannel, "add_item", { item_id: itemId }, (resp) => {
    onCartChange(resp)
  })
}
Cart.removeCartItem = ({ cartChannel, onCartChange }, itemId) => {
  cartRequest(cartChannel, "remove_item", { item_id: itemId }, (resp) => {
    onCartChange(resp)
  })
}
function cartRequest(cartChannel, event, payload, onSuccess) {
  cartChannel.push(event, payload)
    .receive("ok", onSuccess)
    .receive("error", (resp) => console.error("Cart error", event, resp))
    .receive("timeout", () => console.error("Cart timeout", event))
}