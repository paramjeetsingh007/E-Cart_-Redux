# 🛒 Digital E-Cart

A modern e-commerce shopping cart application built with **React** and **Redux Toolkit**.

🔗 **Live Demo:** [https://e-cart-redux-git-main-paramjeetsingh007s-projects.vercel.app/](https://e-cart-redux-git-main-paramjeetsingh007s-projects.vercel.app/)

---

## ✨ Features

- 🔍 **Live Search** — Filter products instantly as you type
- 🛍️ **Add to Cart / Buy Now** — Seamless shopping experience
- ➕➖ **Quantity Management** — Increase or decrease item quantity
- 🗑️ **Remove / Clear Cart** — Remove single items or clear entire cart
- 📍 **Checkout Flow** — 3-step checkout with address, payment & confirmation
- 💳 **Payment Methods** — COD, UPI, and Card (with validation)
- 📦 **Order Confirmation** — Unique Order ID generated on every order
- 💾 **Persistent Cart** — Cart saved in `localStorage`, survives page refresh
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop

---

## 🖼️ Screenshots

| Home | Cart | Checkout |
|------|------|----------|
| Product grid with search | Cart with quantity controls | 3-step checkout flow |

---

## 🗂️ Folder Structure

```
E-Cart/
├── public/
└── src/
    ├── api/                  # Product API fetch
    ├── assets/               # Static assets
    ├── components/
    │   ├── MainComponents/
    │   │   ├── AddressForm.jsx       # Step 1 — Delivery address
    │   │   ├── CheckoutPage.jsx      # Checkout wrapper with stepper
    │   │   ├── Header.jsx            # Sticky header with search & cart
    │   │   ├── MyCart.jsx            # Cart page with quantity controls
    │   │   ├── OrderConfirmation.jsx # Step 3 — Order success page
    │   │   ├── PaymentMethod.jsx     # Step 2 — COD / UPI / Card
    │   │   └── Productcard.jsx       # Product grid with Buy Now
    │   └── SmallComponents/
    │       ├── Cart.jsx              # Cart icon with badge
    │       ├── Logo.jsx              # App logo
    │       └── Searchbar.jsx         # Live search bar
    └── redux/
        └── features/
            ├── CartSlice.js          # Cart state — add, remove, quantity
            ├── orderSlice.js         # Order state — address, payment, total
            └── store.js              # Redux store config
```

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| React 18 | UI Library |
| Redux Toolkit | State Management |
| React Router DOM | Client-side Routing |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| React Toastify | Toast Notifications |
| Vite | Build Tool |
| Vercel | Deployment |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/paramjeetsingh007/E-Cart.git
cd E-Cart
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

---

## 🔄 Redux State Structure

### CartSlice
```js
{
  query: '',        // Search query
  count: 0,         // Total items in cart
  items: []         // Cart items with quantity
}
```

### orderSlice
```js
{
  currentStep: 1,       // 1: Address | 2: Payment | 3: Confirmation
  address: null,        // Delivery address
  paymentMethod: null,  // cod | upi | card
  totalAmount: 0,       // Saved before cart clears
  orderId: null,        // e.g. ORD-1718123456789
  orderPlaced: false
}
```

---

## 📦 API

Products are fetched from the [Fake Store API](https://fakestoreapi.com/):

```
GET https://fakestoreapi.com/products
```

Prices are converted to INR by multiplying with **85**.

---

## 📱 Responsive Breakpoints

| Screen | Layout |
|--------|--------|
| Mobile | Single column, search toggle |
| Tablet | 2-column product grid |
| Desktop | 4-column grid, full header |

---

## 👨‍💻 Author

**Paramjeet Singh**

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).