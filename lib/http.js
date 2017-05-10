"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _requestPromiseNative = require("request-promise-native");

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var http = {
  request: function request(body) {
    return (0, _requestPromiseNative2.default)(body);
  },
  downloadFile: function downloadFile(uri, localFilePath) {
    return new Promise(function (resolve, reject) {

      var file = _fs2.default.createWriteStream(localFilePath);
      file.on("finish", function () {
        file.close(function () {
          resolve(localFilePath);
        });
      });

      _request2.default.get(uri).on("error", function (err) {
        reject(err);
      }).pipe(file);
    });
  }
};

exports.default = http;
//# sourceMappingURL=http.js.map