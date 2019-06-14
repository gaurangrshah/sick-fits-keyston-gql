// takes in the entire cart
export default function calcTotalPrice(cart) {
  // reduces to a single item -- tally (running total)
  return cart.reduce((tally, cartItem) => {
    // if the item is no longer in the cart (confirm it hasnt been removed)
    if (!cartItem.item) return tally;
    // return calculated total:
    return tally + cartItem.quantity * cartItem.item.price;

  }, 0);
}
