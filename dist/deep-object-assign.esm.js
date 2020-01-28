function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var reducer = function reducer(sum, val) {
  for (var _i = 0, _Object$keys = Object.keys(val); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var both = [val[key], sum[key]];
    var bothArrays = both.every(function (a) {
      return Array.isArray(a);
    });
    var bothObjects = both.every(function (a) {
      return _typeof(a) === 'object' && !Array.isArray(a) && !(a instanceof Date) && !(a instanceof RegExp);
    });

    if (bothArrays) {
      // Merge both arrays together.
      sum[key] = [].concat(_toConsumableArray(sum[key]), _toConsumableArray(val[key]));
    } else if (bothObjects) {
      // Merge both objects together.  (Note: recursive)
      sum[key] = deepAssign({}, sum[key], val[key]);
    } else {
      // Fallback: overwrite previously-set value.
      sum[key] = val[key];
    }
  }

  return sum;
}; // Make sure inputs to reduce() are valid.


var isValidType = function isValidType(obj) {
  return typeof obj !== 'undefined' && obj !== null;
};

var deepAssign = function deepAssign(receiverObject) {
  for (var _len = arguments.length, sourceObjects = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sourceObjects[_key - 1] = arguments[_key];
  }

  // Note: intentionally mutates receiverObject, like Object.assign() does.
  return sourceObjects.filter(isValidType).reduce(reducer, receiverObject);
};

export default deepAssign;
