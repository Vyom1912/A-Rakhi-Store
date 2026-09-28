import { render, screen, fireEvent } from "@testing-library/react";
import { useContext } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ShopContextProvider, { ShopContext } from "./Context/ShopContext";
import CheckoutForm from "./Components/CheckoutForm/CheckoutForm";
import CustomRakhi from "./Pages/CustomRakhi";
import all_product from "./Components/Assets/all_product";
import { splitLetters } from "./splitLetters";
import { buildOrderMessage } from "./orderMessage";

const renderWithShop = (ui, { cart = {}, custom = [], path = "/" } = {}) => {
  localStorage.clear();
  localStorage.setItem("rakhi-store-cart", JSON.stringify(cart));
  localStorage.setItem("rakhi-store-custom", JSON.stringify(custom));
  window.open = jest.fn();
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ShopContextProvider>
        <Routes>
          <Route path='*' element={ui} />
          <Route path='/cart' element={<p>Cart page</p>} />
        </Routes>
      </ShopContextProvider>
    </MemoryRouter>
  );
};

const sentMessage = () => {
  const url = window.open.mock.calls[0][0];
  expect(url.startsWith("https://wa.me/916353344875?text=")).toBe(true);
  return decodeURIComponent(url.split("text=")[1]);
};

const fillCustomer = () => {
  fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Asha" } });
  fireEvent.change(screen.getByLabelText(/mobile number/i), { target: { value: "98765 43210" } });
};

const rahul = {
  key: "custom-1",
  names: [{ text: "RAHUL", spelling: "", qty: 2 }],
  motiColour: "Light Blue",
  instructions: "small heart after the name",
};

// ---------- cart ----------

const CartProbe = () => {
  const { addToCart, removeFromCart, getTotalCartItems, getTotalCartAmount } =
    useContext(ShopContext);
  return (
    <div>
      <button onClick={() => addToCart(1, 2)}>add</button>
      <button onClick={() => removeFromCart(1)}>remove</button>
      <p>items:{getTotalCartItems()}</p>
      <p>total:{getTotalCartAmount()}</p>
    </div>
  );
};

test("cart counts ready-made and custom rakhis, and saves them", () => {
  renderWithShop(<CartProbe />, { custom: [rahul] });
  expect(screen.getByText("items:2")).toBeInTheDocument(); // 2 custom RAHUL rakhis
  fireEvent.click(screen.getByText("add"));
  expect(screen.getByText("items:4")).toBeInTheDocument();
  expect(screen.getByText("total:80")).toBeInTheDocument(); // custom rakhis are priced on WhatsApp
  fireEvent.click(screen.getByText("remove"));
  expect(JSON.parse(localStorage.getItem("rakhi-store-cart"))).toEqual({ 1: 1 });
  expect(JSON.parse(localStorage.getItem("rakhi-store-custom"))).toHaveLength(1);
});

// ---------- checkout ----------

const CheckoutWithItem = () => {
  const { all_product: products } = useContext(ShopContext);
  return <CheckoutForm itemsInCart={[products[0]]} />;
};

test("checkout is blocked until the order terms are accepted", () => {
  renderWithShop(<CheckoutWithItem />, { cart: { 1: 2 } });
  fillCustomer();
  fireEvent.click(screen.getByText("Place order on WhatsApp"));
  expect(screen.getByText(/agree to the order terms/i)).toBeInTheDocument();
  expect(window.open).not.toHaveBeenCalled();
});

test("checkout sends ready-made and custom rakhis in one WhatsApp message, without photos or pickup time", () => {
  renderWithShop(<CheckoutWithItem />, { cart: { 1: 2 }, custom: [rahul] });
  // pickup is arranged on WhatsApp, so there are no date/time or address fields
  expect(screen.queryByLabelText(/pickup date/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/pincode/i)).not.toBeInTheDocument();

  fillCustomer();
  fireEvent.click(screen.getByLabelText(/I have read and agree/i));
  fireEvent.click(screen.getByText("Place order on WhatsApp"));

  const message = sentMessage();
  expect(message).toContain("*Ready-made rakhis* (2 rakhis)");
  expect(message).toContain("Product ID: #1");
  expect(message).toContain("Rs. 40 x 2 = Rs. 80");
  expect(message).toContain("*Custom name rakhis* (2 rakhis)");
  expect(message).toContain("1. RAHUL x2");
  expect(message).toContain("Letters: R - A - H - U - L");
  expect(message).toContain("Thread: Maroon");
  expect(message).toContain("Moti colour: Light Blue");
  expect(message).toContain("Instructions: small heart after the name");
  expect(message).toContain("*Total:* Rs. 80 + custom rakhis (price to confirm)");
  expect(message).toContain("Phone: 9876543210");
  expect(message).toContain("Please tell me the pickup time.");
  expect(message).toContain("Pickup address: 58, Shardakunj Society, Motipura, Himatnagar");
  expect(message).toContain("I have checked the spelling of every custom name.");
  expect(message).toContain("I agree to the order terms");
  expect(message).not.toMatch(/Photo|http|Preferred pickup/);
});

test("an order with only ready-made rakhis has a simple total and no custom lines", () => {
  const message = buildOrderMessage({
    readyItems: [{ product: all_product[0], qty: 1 }],
    customItems: [],
    allProducts: all_product,
    customer: { name: "Asha", phone: "", address: "", note: "" },
    phone: "9876543210",
    isDelivery: false,
  });
  expect(message).toContain("*Total: Rs. 40*");
  expect(message).not.toMatch(/Custom (name )?rakhi|spelling/);
});

// ---------- custom rakhi ----------

test("custom names are split into the letters that will be woven", () => {
  expect(splitLetters("RAHUL")).toEqual(["R", "A", "H", "U", "L"]);
  expect(splitLetters("VEER")).toEqual(["V", "E", "E", "R"]);
});

test("custom rakhi only accepts English names", () => {
  renderWithShop(<CustomRakhi />, { path: "/custom-rakhi" });
  fireEvent.change(screen.getByPlaceholderText("e.g. RAHUL"), { target: { value: "ભાઈ" } });
  fireEvent.click(screen.getByRole("button", { name: "Add to cart" }));
  expect(screen.getByText(/English letters \(A–Z\) only/)).toBeInTheDocument();
});

test("custom rakhi is added to the cart with maroon thread and the chosen Moti colour", () => {
  renderWithShop(<CustomRakhi />, { path: "/custom-rakhi?design=42" });
  expect(screen.getByText("Thread: always maroon")).toBeInTheDocument();
  // only the four Moti colours are offered, White first and recommended
  expect(screen.getAllByRole("radio").map((r) => r.value)).toEqual([
    "White",
    "Light Blue",
    "Light Pink",
    "Yellow",
  ]);
  expect(screen.getByLabelText(/White/)).toBeChecked();
  expect(screen.getByText("Recommended")).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText("e.g. RAHUL"), { target: { value: "rahul" } });
  fireEvent.click(screen.getByLabelText(/Yellow/));
  fireEvent.click(screen.getByRole("button", { name: "Add to cart" }));
  expect(screen.getByText(/checked the spelling/i, { selector: ".field-error" })).toBeInTheDocument();

  fireEvent.click(screen.getByLabelText(/I have checked the spelling/i));
  fireEvent.click(screen.getByRole("button", { name: "Add to cart" }));
  expect(screen.getByText("Cart page")).toBeInTheDocument();

  const [saved] = JSON.parse(localStorage.getItem("rakhi-store-custom"));
  expect(saved.names).toEqual([{ text: "RAHUL", spelling: "", qty: 1 }]);
  expect(saved.motiColour).toBe("Yellow");
  expect(saved.baseProductId).toBe(42);
});
