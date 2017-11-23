const getType = val => {
  let type;
  if (Array.isArray(val)) {
    type = 'array';
  } else if (val instanceof Date) {
    type = 'date';
  } else {
    type = typeof val;
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
      sum[key] = sum[key].concat(val[key]);
    } else if (bothObjects) {
      sum[key] = deepAssign({}, sum[key], val[key]);
    } else {
      sum[key] = val[key];
    }
  }

  return sum;
};

const isUndefinedOrNull = obj => !(typeof obj === 'undefined' || obj === null);

const deepAssign = (receiverObject, ...sourceObjects) => {
  const objsFiltered = sourceObjects.filter(isUndefinedOrNull);

  // Note: intentionally mutates receiverObject, like Object.assign() does.
  return objsFiltered.reduce(reducer, receiverObject);
};

export default deepAssign;
