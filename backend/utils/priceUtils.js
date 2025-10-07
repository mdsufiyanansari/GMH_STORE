// backend/utils/priceUtils.js

// Calculate discounted price (offer price)
export const calculateOfferPrice = (price, offerPercent) => {
  if (!price || offerPercent <= 0) return price;
  const offerPrice = Math.round(price - (price * offerPercent) / 100);
  return offerPrice;
};
