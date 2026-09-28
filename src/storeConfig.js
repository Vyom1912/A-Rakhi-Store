import swasdesign_banner from "./Components/Assets/banner_swasdesign.webp";
import ram_banner from "./Components/Assets/banner_ram.webp";
import big_line_banner from "./Components/Assets/banner_5line.webp";
import small_line_banner from "./Components/Assets/banner_3line.webp";
import swastik_sample from "./Components/Assets/product_1.jpg";
import ram_sample from "./Components/Assets/product_35.jpg";
import big_line_sample from "./Components/Assets/product_17.jpg";
import small_line_sample from "./Components/Assets/product_58.jpg";
import moti_white from "./Components/Assets/moti_white.jpg";
import moti_lightblue from "./Components/Assets/moti_lightblue.jpg";
import moti_yellow from "./Components/Assets/moti_yellow.jpg";

export const STORE_NAME = "The Maroons";

// every order and contact message is sent to this WhatsApp number (country code, no +)
export const WHATSAPP_NUMBER = "916353344875";
export const PHONE_DISPLAY = "+91 63533 44875";

// Home delivery is switched off for now: every order is a pickup.
// Set this to true to offer free home delivery again (only inside DELIVERY_PINCODE).
export const HOME_DELIVERY_ENABLED = false;
export const DELIVERY_CITY = "Himatnagar";
export const DELIVERY_PINCODE = "383001";

export const PICKUP_ADDRESS = "58, Shardakunj Society, Motipura, Himatnagar, S.K. - 383001";
export const PICKUP_AREA = "Motipura, Himatnagar";
export const PICKUP_MAP_URL = "https://maps.app.goo.gl/UaDUUhqKjoLiSh4C8";

// every rakhi is made by hand after the order is confirmed
export const MAKING_TIME = "2–3 days";
// customers are asked to order at least this many days before they need their rakhis
export const ORDER_AHEAD_DAYS = 3;
// ready orders are kept this long after we send the "ready for pickup" message
export const PICKUP_HOLD_DAYS = 7;

// custom name rakhis: the thread is always maroon, customers choose the Moti (bead) colour.
// photo = a close-up of real beads from our product photos, so customers see the true colour.
// hex = the colour used for the letters in the live name preview.
export const THREAD_COLOUR = "Maroon";
export const THREAD_HEX = "#7a1427";
export const MOTI_COLOURS = [
  { name: "White", hex: "#efe8e9", photo: moti_white, recommended: true },
  { name: "Light Blue", hex: "#4aa8d8", photo: moti_lightblue },
  { name: "Light Pink", hex: "#f5b4c6" }, // no photo of pink beads yet, shown as a drawn bead
  { name: "Yellow", hex: "#f2b62c", photo: moti_yellow },
];

// one short line describing how customers get their order, used across the site
export const FULFILMENT_NOTE = HOME_DELIVERY_ENABLED
  ? `Free home delivery in ${DELIVERY_CITY} (${DELIVERY_PINCODE}) or pickup`
  : `Pickup from ${PICKUP_AREA}`;

export const categories = [
  {
    slug: "swastik-design",
    label: "Swastik",
    title: "Swastik Design Rakhis",
    banner: swasdesign_banner,
    sample: swastik_sample,
  },
  { slug: "ram", label: "Ram", title: "Ram Rakhis", banner: ram_banner, sample: ram_sample },
  {
    slug: "design-big",
    label: "5 Line",
    title: "5 Line Rakhis",
    banner: big_line_banner,
    sample: big_line_sample,
  },
  {
    slug: "design-small",
    label: "3 Line",
    title: "3 Line Rakhis",
    banner: small_line_banner,
    sample: small_line_sample,
  },
];

export const getCategory = (slug) => categories.find((c) => c.slug === slug);

export const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const openWhatsApp = (message) =>
  window.open(whatsappLink(message), "_blank", "noopener");
