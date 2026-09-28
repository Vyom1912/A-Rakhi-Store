import {
  DELIVERY_CITY,
  DELIVERY_PINCODE,
  MAKING_TIME,
  PICKUP_ADDRESS,
  STORE_NAME,
  THREAD_COLOUR,
} from "./storeConfig";
import { splitLetters } from "./splitLetters";

const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;

// lines describing one custom name rakhi request, for the WhatsApp order
export const customItemLines = (item, index, allProducts) => {
  const base = allProducts.find((p) => p.id === item.baseProductId);
  return [
    `Custom rakhi ${index + 1}:`,
    ...item.names.flatMap((name, i) => [
      `  ${i + 1}. ${name.text} x${name.qty}`,
      `     Letters: ${splitLetters(name.text).join(" - ")}`,
      ...(name.spelling ? [`     Spelling note: ${name.spelling}`] : []),
    ]),
    `  Thread: ${THREAD_COLOUR}`,
    `  Moti colour: ${item.motiColour}`,
    ...(base ? [`  Based on design: #${base.id} - ${base.name}`] : []),
    ...(item.instructions ? [`  Instructions: ${item.instructions}`] : []),
  ];
};

// the complete order sent on WhatsApp: ready-made rakhis, custom rakhis, customer and pickup
export const buildOrderMessage = ({
  readyItems, // [{ product, qty }]
  customItems,
  allProducts,
  customer,
  phone,
  isDelivery,
}) => {
  const readyTotal = readyItems.reduce((sum, { product, qty }) => sum + product.new_price * qty, 0);
  const readyCount = readyItems.reduce((sum, { qty }) => sum + qty, 0);
  const customCount = customItems.reduce(
    (sum, item) => sum + item.names.reduce((s, n) => s + n.qty, 0),
    0
  );
  const lines = [`*New Order - ${STORE_NAME}*`];

  if (readyItems.length > 0) {
    lines.push("", `*Ready-made rakhis* (${plural(readyCount, "rakhi")})`);
    readyItems.forEach(({ product, qty }, i) => {
      lines.push(
        `${i + 1}. ${product.name}`,
        `   Product ID: #${product.id}`,
        `   Rs. ${product.new_price} x ${qty} = Rs. ${product.new_price * qty}`
      );
    });
    lines.push(`Subtotal: Rs. ${readyTotal}`);
  }

  if (customItems.length > 0) {
    lines.push("", `*Custom name rakhis* (${plural(customCount, "rakhi")})`);
    customItems.forEach((item, i) => lines.push(...customItemLines(item, i, allProducts)));
    lines.push("Price: please confirm on WhatsApp");
  }

  lines.push(
    "",
    customItems.length > 0
      ? `*Total:* Rs. ${readyTotal} + custom rakhis (price to confirm)`
      : `*Total: Rs. ${readyTotal}*`,
    "",
    "*Customer details*",
    `Name: ${customer.name.trim()}`,
    `Phone: ${phone}`
  );

  if (isDelivery) {
    lines.push(
      "Delivery: Home delivery (free)",
      `Address: ${customer.address.trim()}, ${DELIVERY_CITY} - ${DELIVERY_PINCODE}`,
      ...(customer.note.trim() ? [`Note: ${customer.note.trim()}`] : [])
    );
  } else {
    lines.push(
      "Pickup: I will collect the order. Please tell me the pickup time.",
      `Pickup address: ${PICKUP_ADDRESS}`
    );
  }

  lines.push("");
  if (customItems.length > 0) {
    lines.push("I have checked the spelling of every custom name.");
  }
  lines.push(
    `I understand the rakhis are handmade in ${MAKING_TIME} after you confirm` +
      (customItems.length > 0 ? ", custom rakhis can't be cancelled once you start making them," : "") +
      " and I agree to the order terms."
  );
  return lines.join("\n");
};
