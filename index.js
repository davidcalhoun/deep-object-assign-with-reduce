const getReducer = (options = {}) => {
  const { overwriteArrays, overwriteObjects } = options;

  return (sum, val) => {
    // Get all keys, including any Symbols.
    const keys = Reflect.ownKeys(val);

    for (const key of keys) {
      const both = [val[key], sum[key]];
      const bothArrays = both.every(a => Array.isArray(a));
      const bothObjects = both.every(
        a =>
          typeof a === "object" &&
          !Array.isArray(a) &&
          !(a instanceof Date) &&
          !(a instanceof RegExp)
      );

      if (bothArrays && !overwriteArrays) {
        // Merge both arrays together.
        sum[key] = [...sum[key], ...val[key]];
      } else if (bothObjects && !overwriteObjects) {
        // Recursively merge both objects together.
        sum[key] = deepAssign({}, sum[key], val[key]);
      } else {
        // Fallthrough: overwrite previously-set value.
        sum[key] = val[key];
      }
    }

    return sum;
  };
};

// Makes sure inputs to reduce() are valid.
const isValidType = obj => typeof obj !== "undefined" && obj !== null;

/**
 * Allows for customizing array and object merging behavior.
 */
export const deepAssignOptions = (options = {}, receiverObject, ...sourceObjects) => {
  const reducer = getReducer(options);

  // Note: intentionally mutates receiverObject, just like Object.assign().
  return sourceObjects.filter(isValidType).reduce(reducer, receiverObject);
};

/**
 * With default options.
 */
const deepAssign = (receiverObject, ...sourceObjects) => {
  const defaultOptions = {
    overwriteArrays: false,
    overwriteObjects: false
  }

  return deepAssignOptions(defaultOptions, receiverObject, ...sourceObjects);
};

export default deepAssign;
