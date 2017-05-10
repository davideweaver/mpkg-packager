"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncFile = require("async-file");

var fsPromise = _interopRequireWildcard(_asyncFile);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var file = {
  readFile: function readFile(path) {
    return fsPromise(path);
  }
};

exports.default = file;
//# sourceMappingURL=file.js.map