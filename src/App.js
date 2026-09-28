import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Contact from "./Pages/Contact";
import CustomRakhi from "./Pages/CustomRakhi";
import Terms from "./Pages/Terms";
import HowToOrder from "./Components/HowToOrder/HowToOrder";
import Footer from "./Components/Footer/Footer";
import Loader from "./Components/Loader/Loader";
import { useContext, useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { categories, STORE_NAME, whatsappLink } from "./storeConfig";
import whatsapp_icon from "./Components/Assets/whatsapp_icon.png";
import { ShopContext } from "./Context/ShopContext";

ReactGA.initialize("G-JKPMJ5WFXB");

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const { toast } = useContext(ShopContext);

  // on phones the product page has a sticky buy bar, so floating items sit above it
  const raised = pathname.startsWith("/product/") ? "raised" : "";

  // short branded intro
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // track and reset scroll on every route change
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: pathname });
    window.scrollTo(0, 0);
  }, [pathname]);

  if (loading) return <Loader />;

  return (
    <div className={`app ${raised ? "has-buybar" : ""}`}>
      <Navbar />
      <main className='app-main'>
        <Routes>
          <Route path='/' element={<Shop />} />
          {categories.map((category) => (
            <Route
              key={category.slug}
              path={`/${category.slug}`}
              element={<ShopCategory category={category} />}
            />
          ))}
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/custom-rakhi' element={<CustomRakhi />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/terms' element={<Terms />} />
          <Route
            path='/how-to-order'
            element={
              <div className='page-top'>
                <HowToOrder />
              </div>
            }
          />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
      <Footer />
      {pathname !== "/cart" && (
        <a
          className={`whatsapp-float ${raised}`}
          href={whatsappLink(`Hello ${STORE_NAME}! I have a question about your rakhis.`)}
          target='_blank'
          rel='noreferrer'
          aria-label='Chat with us on WhatsApp'>
          <img src={whatsapp_icon} alt='' />
        </a>
      )}
      {toast && pathname !== "/cart" && (
        <div className={`toast ${raised}`} key={toast.key} role='status'>
          {toast.message}
          <Link to='/cart'>View cart</Link>
        </div>
      )}
    </div>
  );
}

export default App;
