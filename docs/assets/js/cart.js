/* ===============================
   CART – LocalStorage Logic (Final)
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
  const count = cart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);

  countEl.textContent = count;
  countEl.style.display = count > 0 ? "inline-block" : "none";
}

/* ✅ FINAL: supports qty from product page */
function addToCart(product) {
  const cart = getCart();

  // qty coming from page (fallback = 1)
  const qtyToAdd = Math.max(1, parseInt(product.qty, 10) || 1);

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty = (parseInt(existing.qty, 10) || 0) + qtyToAdd;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      image: product.image || "",
      qty: qtyToAdd
    });
  }

  saveCart(cart);
}

function updateQty(id, qty) {
  qty = parseInt(qty, 10);
  if (!qty || qty < 1) return;

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
    const lineTotal = (Number(item.price) || 0) * (Number(item.qty) || 0);
    message += `• ${item.name} × ${item.qty} = ${lineTotal} درهم\n`;
    total += lineTotal;
  });

  message += `\n💰 المجموع: ${total} درهم`;

  const phone = "212600000000"; // 🔴 بدّلي الرقم
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", updateCartIcon);
