const getReducer = (options = {}) => {
  const { overwriteArrays, overwriteObjects } = options;

  return (sum, val) => {
    // Get all keys, including any Symbols.
    const keys = Reflect.ownKeys(val);

    for (const key of keys) {
      const both = [val[key], sum[key]];
      const bothArrays = both.every(Array.isArray);
      const bothObjects = both.every(isObject);

      if (bothArrays && !overwriteArrays) {
        // Merge both arrays together.
        sum[key] = [...sum[key], ...val[key]];
      } else if (bothObjects && !overwriteObjects) {
        // Recursively merge both objects together.
        sum[key] = deepAssignOptions(options, {}, sum[key], val[key]);
      } else {
        // Fallthrough: overwrite previously-set value.
        sum[key] = val[key];
      }
    }

    return sum;
  };
};

const isObject = val => {
  return (
    typeof val === "object" &&
    !Array.isArray(val) &&
    !(val instanceof Date) &&
    !(val instanceof RegExp) &&
    val !== null
  );
};

// Makes sure inputs to reduce() are valid.
const isValidType = obj => typeof obj !== "undefined" && obj !== null;

/**
 * Allows for customizing array and object merging behavior.
 */
export const deepAssignOptions = (
  options = {},
  receiverObject,
  ...sourceObjects
) => {
  const reducer = getReducer(options);

  return sourceObjects.filter(isValidType).reduce(reducer, receiverObject);
};

/**
 * With default options, merging arrays and objects.
 */
export const deepAssign = (receiverObject, ...sourceObjects) => {
  const defaultOptions = {
    overwriteArrays: false,
    overwriteObjects: false
  };

  // Note: intentionally mutates receiverObject, just like Object.assign().
  return deepAssignOptions(defaultOptions, receiverObject, ...sourceObjects);
};

export default deepAssign;
