/**
 * Formats a number as currency with thousand separators
 * @param value
 * @returns
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
