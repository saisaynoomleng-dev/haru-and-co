export const generateSKU = () => {
  return `${Math.random().toString(36).toUpperCase().substring(2)}`;
};
