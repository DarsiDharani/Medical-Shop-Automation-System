import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./header";
import Body from "./body";
import Footer from "./footer.js";
import Register from "./register.jsx";
import Error from "./error";
import About from "./aboutus.jsx";
import ContactUs from "./Contactus.jsx";
import Login from "./Login.jsx";
import OwnerLogin from "./ownerLogin.js";
import Cart from "./cart";
import Order from "./orders";
import First from "./first.js";
import OnlinePharmacyStore from "./ohome.js";
import AddMedicines from "./addMedicines.jsx";
import AddVendors from "./addVendor.jsx";
import ShippingPage from "./shipping.js";
import BillPage from "./bill.jsx";
import SalesReportProfitView from "./salesReportProfitView.jsx";
import SalesList from "./SalesList.jsx";
import RolesPage from "./role.jsx";
import PharmacistLogin from "./pharmacist.jsx";
import VendorLogin from "./vendor.jsx";
import PharmacistPage from "./pharmacistPage.jsx";
import LowStockMedicines from "./LowStockMedicines.jsx";
import VendorOrders from "./VendorOrders.jsx";
import VendorOrderHistory from "./VendorOrderHistory.jsx";
import VendorPage from "./VendorPage.jsx";
import PaymentCheck from "./PaymentCheck.jsx";
import PaymentHistory from "./PaymentHistory.jsx";

// Main layout component with shared state for cart, orders, and customer
const MainLayout = ({ customer }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cartCount, setCartCount] = useState(0);  // Customer state

  const addToCart = (medicine) => {
    setCartItems([...cartItems, medicine]);
    setCartCount(cartCount + 1); // Increment cart count
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.code !== id));
    setCartCount(cartCount > 0 ? cartCount - 1 : 0); // Decrement cart count
  };

  const checkout = async () => {
    // Logic for checkout can be extended here if needed
    setOrders([...orders, ...cartItems]);
    setCartItems([]);
    setCartCount(0); // Reset cart count after checkout
  };

  return (
    <div>
      <Header cartCount={cartCount} />
      <Outlet context={{ cartItems, addToCart, removeFromCart, checkout, orders, customer, setCartCount }} />
      <Footer />
    </div>
  );
};

// Layout for routes that do not require Header and Footer
const RegisterLayout = ({ setCustomer }) => (
  <div>
    <Outlet context={{ setCustomer }} />
  </div>
);

// Router configuration
const appRouter = (customer, setCustomer) => createBrowserRouter([
  {
    path: "/",
    element: <RegisterLayout setCustomer={setCustomer} />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <First /> },
      { path: "/home", element: <OnlinePharmacyStore /> },
      { path: "/role", element: <RolesPage /> },
      { path: "/pharmacist", element: <PharmacistLogin /> },
      { path: "/vendor", element: <VendorLogin /> },
      { path: "/vendorOrders", element: <VendorOrders /> },
      { path: "/vendorPage", element: <VendorPage /> },
      { path: "/paymentCheck", element: <PaymentCheck /> },
    ],
  },
  {
    path: "/body",
    element: <MainLayout customer={customer} />,
    children: [
      { path: "/body", element: <Body /> },
      { path: "/body/about", element: <About /> },
      { path: "/body/contact", element: <ContactUs /> },
      { path: "/body/cart", element: <Cart /> },
      { path: "/body/orders", element: <Order /> },
      { path: "/body/shipping", element: <ShippingPage /> },
      { path: "/body/bill", element: <BillPage /> },
    ],
  },
  {
    path: "/register",
    element: <RegisterLayout setCustomer={setCustomer} />,
    children: [{ path: "/register", element: <Register /> }],
  },
  {
    path: "/login",
    element: <RegisterLayout setCustomer={setCustomer}/>,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    path: "/ownerLogin",
    element: <RegisterLayout setCustomer={setCustomer}/>,
    children: [
      { path: "/ownerLogin", element: <OwnerLogin /> },
      { path: "/ownerLogin/addmedicine", element: <AddMedicines /> },
      { path: "/ownerLogin/pharmacistPage", element: <PharmacistPage /> },
      { path: "/ownerLogin/addvendor", element: <AddVendors /> },
      { path: "/ownerLogin/sales", element: <SalesReportProfitView /> },
      { path: "/ownerLogin/salesList", element: <SalesList /> },
      { path: "/ownerLogin/lowStockMedicines", element: <LowStockMedicines /> },
       { path: "/ownerLogin/vendorOrderHistory", element: <VendorOrderHistory /> },
       { path: "/ownerLogin/paymentHistory", element: <PaymentHistory /> },
    ],
  },
]);

const App = () => {
  const [customer, setCustomer] = useState(null);
  const router = appRouter(customer, setCustomer); // Pass customer and setCustomer to the router

  return <RouterProvider router={router} />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
