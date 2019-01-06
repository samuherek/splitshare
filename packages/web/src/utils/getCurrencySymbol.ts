const currencySymbols = {
  CRC: '₡', // Costa Rican Colón
  EUR: '€', // Euro
  GBP: '£', // British Pound Sterling
  ILS: '₪', // Israeli New Sheqel
  INR: '₹', // Indian Rupee
  JPY: '¥', // Japanese Yen
  KRW: '₩', // South Korean Won
  NGN: '₦', // Nigerian Naira
  PHP: '₱', // Philippine Peso
  PLN: 'zł', // Polish Zloty
  PYG: '₲', // Paraguayan Guarani
  THB: '฿', // Thai Baht
  UAH: '₴', // Ukrainian Hryvnia
  USD: '$', // US Dollar
  VND: '₫', // Vietnamese Dong
};

const getCurrencySymbol = (key: string): string => {
  return currencySymbols[key] || key;
};

export default getCurrencySymbol;
