const fetchProducts = async (query) => {
  try {
    const endPoint = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const response = await fetch(endPoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
