// customer details shared by the cart checkout and the custom rakhi form,
// remembered in the browser so returning customers don't retype them

const CUSTOMER_KEY = "rakhi-store-customer";

export const emptyCustomer = {
  name: "",
  phone: "",
  method: "pickup", // "pickup" or "delivery" (delivery only when enabled in storeConfig)
  address: "",
  pincode: "",
  note: "",
};

export const loadCustomer = () => {
  try {
    return { ...emptyCustomer, ...JSON.parse(localStorage.getItem(CUSTOMER_KEY)) };
  } catch {
    return { ...emptyCustomer };
  }
};

export const saveCustomer = (customer) => {
  try {
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
  } catch {
    // not critical if storage is unavailable
  }
};

// accepts "98765 43210", "+91 9876543210", "09876543210"
export const normalisePhone = (phone) =>
  phone.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");

export const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(normalisePhone(phone));
