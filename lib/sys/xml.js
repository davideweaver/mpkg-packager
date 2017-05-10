"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xml2js = require("xml2js");

var _xml2js2 = _interopRequireDefault(_xml2js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var xml = {
  toJson: function toJson(xml) {
    return new Promise(function (resolve, reject) {
      _xml2js2.default.parseString(xml, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
};

exports.default = xml;
//# sourceMappingURL=xml.js.map