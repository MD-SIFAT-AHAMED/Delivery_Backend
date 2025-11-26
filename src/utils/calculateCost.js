const calculateCost = (data) => {
  const isSameCity = data.senderRegion === data.receiverRegion;
  const weight = parseFloat(data.weight || 0);

  if (data.type === "Document") {
    return isSameCity ? 60 : 80;
  }

  if (data.type === "Non-Document") {
    if (weight <= 3) {
      return isSameCity ? 110 : 150;
    } else {
      const extraPerKg = 40;
      const base = isSameCity ? 110 : 150 + 40; // extra 40 for outside city
      const extraWeightCost = (weight - 3) * extraPerKg;
      return base + extraWeightCost;
    }
  }

  return 0; // fallback
};

module.exports = calculateCost;
