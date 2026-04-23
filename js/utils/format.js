const EURO_FORMATTER = new Intl.NumberFormat('fr-FR', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function fmt(n) {
  return EURO_FORMATTER.format(Math.round(n));
}

export function gc(n) {
  return n < 0 ? 'negative' : n > 0 ? 'positive' : 'neutral';
}
