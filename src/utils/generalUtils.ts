export const formatNumber = (num: number) => {
  return num > 1000 ? (num / 1000).toFixed(2) + "K" : num;
};
