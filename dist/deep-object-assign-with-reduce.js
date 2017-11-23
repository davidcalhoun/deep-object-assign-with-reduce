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

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var getType = function getType(val) {
    var type = void 0;
    if (Array.isArray(val)) {
      type = 'array';
    } else if (val instanceof Date) {
      type = 'date';
    } else {
      type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
    }

    return type;
  };

  var reducer = function reducer(sum, val) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(val)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        var sumType = getType(sum[key]);
        var valType = getType(val[key]);
        var bothArrays = valType === 'array' && sumType === 'array';
        var bothObjects = valType === 'object' && sumType === 'object';

        if (bothArrays) {
          sum[key] = sum[key].concat(val[key]);
        } else if (bothObjects) {
          sum[key] = deepAssign({}, sum[key], val[key]);
        } else {
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

  var isUndefinedOrNull = function isUndefinedOrNull(obj) {
    return !(typeof obj === 'undefined' || obj === null);
  };

  var deepAssign = function deepAssign(receiverObject) {
    for (var _len = arguments.length, sourceObjects = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sourceObjects[_key - 1] = arguments[_key];
    }

    var objsFiltered = sourceObjects.filter(isUndefinedOrNull);

    // Note: intentionally mutates receiverObject, like Object.assign() does.
    return objsFiltered.reduce(reducer, receiverObject);
  };

  exports.default = deepAssign;
  module.exports = exports['default'];
});
