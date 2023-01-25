export const getTokenExpireDate = (expireDate) => {
  return new Date(new Date().getTime() + expireDate * 1000);
};
