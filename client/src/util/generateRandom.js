export const generateRandom = (max, count) => {
  let nums = new Set();
  while (nums.size < count) {
    nums.add(Math.floor(Math.random() * max));
  }
  return [...nums];
};
