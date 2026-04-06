function toCents(value) {
  if (typeof value === "string") {
    value = value.replace(",", ".");
  }
  return Math.round(Number(value) * 100);
}

function fromCents(value) {
  return value / 100;
}

module.exports = { toCents, fromCents };
