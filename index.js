const getType = val => {
  let type = typeof val;

  // Check for types that appear as "objects" but shouldn't be handled as such.
  if (Array.isArray(val)) {
    type = 'array';
  } else if (val instanceof Date) {
    type = 'date';
  }

  return type;
};

const reducer = (sum, val) => {
  for (const key of Object.keys(val)) {
    const sumType = getType(sum[key]);
    const valType = getType(val[key]);
    const bothArrays = valType === 'array' && sumType === 'array';
    const bothObjects = valType === 'object' && sumType === 'object';

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
  const sources = sourceObjects.filter(isValidType);

  // Note: intentionally mutates receiverObject, like Object.assign() does.
  return sources.reduce(reducer, receiverObject);
};

export default deepAssign;
