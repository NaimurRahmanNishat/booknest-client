const getBaseUrl = () => {
  return typeof window !== 'undefined' ? 'https://booknest-server-sage.vercel.app' : '';
};

export { getBaseUrl };