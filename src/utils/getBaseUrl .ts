const getBaseUrl = () => {
  return typeof window !== 'undefined' ? 'http://localhost:3100' : '';
};

export { getBaseUrl };