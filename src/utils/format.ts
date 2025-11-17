export const formatCurrency = (value: number, locale = 'pt-BR', currency = 'BRL'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};

export const formatDate = (date: string | Date, locale = 'pt-BR'): string => {
  return new Intl.DateTimeFormat(locale).format(new Date(date));
};

export const formatArea = (area: number): string => {
  return `${area} m²`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};
