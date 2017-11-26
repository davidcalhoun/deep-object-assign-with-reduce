(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.index = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var reducer = function reducer(sum, val) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(val)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        var both = [val[key], sum[key]];
        var bothArrays = both.filter(function (a) {
          return Array.isArray(a);
        }).length === 2;
        var bothObjects = both.filter(function (a) {
          return (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && !Array.isArray(a) && !(a instanceof Date);
        }).length === 2;

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
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return sum;
  };

  // Make sure inputs to reduce() are valid.
  var isValidType = function isValidType(obj) {
    return typeof obj !== 'undefined' && obj !== null;
  };

  var deepAssign = function deepAssign(receiverObject) {
    for (var _len = arguments.length, sourceObjects = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sourceObjects[_key - 1] = arguments[_key];
    }

    // Note: intentionally mutates receiverObject, like Object.assign() does.
    return sourceObjects.filter(isValidType).reduce(reducer, receiverObject);
  };

  exports.default = deepAssign;
  module.exports = exports['default'];
});
