const reducer = (sum, val) => {
  for (const key of Object.keys(val)) {
    const both = [val[key], sum[key]];
    const bothArrays = both.every(a => Array.isArray(a));
    const bothObjects = both.every(a => typeof a === 'object' && !Array.isArray(a) && !(a instanceof Date));

    if (bothArrays) {
      // Merge both arrays together.
      sum[key] = [...sum[key], ...val[key]];
    } else if (bothObjects) {
      // Merge both objects together.  (Note: recursive)
      sum[key] = deepAssign({}, sum[key], val[key]);
    } else {
      // Fallback: overwrite previously-set value.
      sum[key] = val[key];
    }
  }

  return sum;
};

// Make sure inputs to reduce() are valid.
const isValidType = obj => typeof obj !== 'undefined' && obj !== null;

const deepAssign = (receiverObject, ...sourceObjects) => {
  // Note: intentionally mutates receiverObject, like Object.assign() does.
  return sourceObjects.filter(isValidType).reduce(reducer, receiverObject);
};

export default deepAssign;
