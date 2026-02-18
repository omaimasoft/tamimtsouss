
/* ===============================
   CART – LocalStorage Logic
================================ */

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartIcon();
}

function updateCartIcon() {
  const countEl = document.querySelector(".cart-count");
  if (!countEl) return;

  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  countEl.textContent = count;
  countEl.style.display = count > 0 ? "inline-block" : "none";
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
}

function updateQty(id, qty) {
  if (qty < 1) return;
  const cart = getCart();
  const item = cart.find(i => i.id === id);

  if (item) {
    item.qty = qty;
    saveCart(cart);
    location.reload();
  }
}

function removeFromCart(id) {
  const cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
  location.reload();
}

function clearCart() {
  localStorage.removeItem("cart");
  updateCartIcon();
  location.reload();
}

/* ===============================
   WhatsApp Order
================================ */
function confirmOrder() {
  const cart = getCart();

  if (cart.length === 0) {
    alert("السلة فارغة");
    return;
  }

  let message = "🛒 طلب جديد من الموقع:\n\n";
  let total = 0;

  cart.forEach(item => {
    message += `• ${item.name} × ${item.qty} = ${item.price * item.qty} درهم\n`;
    total += item.price * item.qty;
  });

  message += `\n💰 المجموع: ${total} درهم`;

  const phone = "212600000000"; // 🔴 بدّلي الرقم
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", updateCartIcon);
