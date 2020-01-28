const reducer = (sum, val) => {
  // Get all keys, including any Symbols.
  const keys = Reflect.ownKeys(val);

  for (const key of keys) {
    const both = [val[key], sum[key]];
    const bothArrays = both.every(a => Array.isArray(a));
    const bothObjects = both.every(a => typeof a === 'object' && !Array.isArray(a) && !(a instanceof Date) && !(a instanceof RegExp));

    if (bothArrays) {
      // Merge both arrays together.
      sum[key] = [...sum[key], ...val[key]];
    } else if (bothObjects) {
      // Recursively merge both objects together.
      sum[key] = deepAssign({}, sum[key], val[key]);
    } else {
      // Fallthrough: overwrite previously-set value.
      sum[key] = val[key];
    }
  }

  return sum;
};

// Makes sure inputs to reduce() are valid.
const isValidType = obj => typeof obj !== 'undefined' && obj !== null;

const deepAssign = (receiverObject, ...sourceObjects) => {
  // Note: intentionally mutates receiverObject, just like Object.assign().
  return sourceObjects.filter(isValidType).reduce(reducer, receiverObject);
};

export default deepAssign;
