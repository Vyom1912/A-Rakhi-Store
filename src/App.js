import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import swasdesign_banner from "./Components/Assets/banner_swasdesign.png";
import ram_banner from "./Components/Assets/banner_ram.png";
import big_line_banner from "./Components/Assets/banner_5line.png";
import small_line_banner from "./Components/Assets/banner_3line.png";
import Loader from "./Components/Loader/Loader";
import { useEffect, useState } from "react"; // 👈 Add this
import ReactGA from "react-ga4";

ReactGA.initialize("G-JKPMJ5WFXB");
function App() {
  const [loading, setLoading] = useState(true); // 👈 Loading state
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />; // 👈 Show loader until loading is false

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route
          path='/swastik-design'
          element={
            <ShopCategory
              banner={swasdesign_banner}
              category='swastik-design'
            />
          }
        />
        <Route
          path='/ram'
          element={<ShopCategory banner={ram_banner} category='ram' />}
        />
        <Route
          path='/design-big'
          element={
            <ShopCategory banner={big_line_banner} category='design-big' />
          }
        />
        <Route
          path='/design-small'
          element={
            <ShopCategory banner={small_line_banner} category='design-small' />
          }
        />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
