import { getCartHtml } from './cartRenderer'

const dom = {}

function getProductIds() {
  const products = document.querySelectorAll('.product-listing')
  return Array.from(products).map((el) => el.dataset.productId)
}

// This function lets the DOM turn HTML into the appropriate node types,
// and then swaps out the original element for the new node.
function replaceProductComingSoon(productId, sizeHtml) {
  const name = `.product-soon-${productId}`
  const productSoonEls = document.querySelectorAll(name)

  productSoonEls.forEach((el) => {
    // It seems it is also to support IE and Safari and is shorter to write:
    // https://stackoverflow.com/questions/9284117/inserting-arbitrary-html-into-a-documentfragment/25214113
    const fragment = document.createRange()
      .createContextualFragment(sizeHtml)
    el.replaceWith(fragment)
  })
}

function updateItemLevel(itemId, level) {
  Array.from(document.querySelectorAll('.size-container__entry')).
    filter((el) => el.value == itemId).
    forEach((el) => {
      removeStockLevelClasses(el)
      el.classList.add(`size-container__entry--level-${level}`)
      el.disabled = level === "out"
    })
}

function removeStockLevelClasses(el) {
  Array.from(el.classList).
    filter((s) => s.startsWith("size-container__entry--level-")).
    forEach((name) => el.classList.remove(name))
}

dom.getProductIds = getProductIds
dom.replaceProductComingSoon = replaceProductComingSoon
dom.updateItemLevel = updateItemLevel
dom.renderCartHtml = (cart) => {
  const cartContainer = document.getElementById("cart-container")
  cartContainer.innerHTML = getCartHtml(cart)
}

export default dom