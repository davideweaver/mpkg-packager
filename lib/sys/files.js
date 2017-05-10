"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _asyncFile = require("async-file");

var _asyncFile2 = _interopRequireDefault(_asyncFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Files = function () {
  function Files() {
    _classCallCheck(this, Files);
  }

  _createClass(Files, [{
    key: "read",
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(path) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _asyncFile2.default.readTextFile(path);

              case 3:
                return _context.abrupt("return", _context.sent);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                throw "couldn't read file: " + path + ", " + _context.t0;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      function read(_x) {
        return _ref.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: "delete",
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(path) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _asyncFile2.default.delete(path);

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                throw "couldn't delete file/folder: " + path + ", " + _context2.t0;

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 6]]);
      }));

      function _delete(_x2) {
        return _ref2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "exists",
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(path) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _asyncFile2.default.exists(path);

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3["catch"](0);
                throw "couldn't check file/folder existence: " + path + ", " + _context3.t0;

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 6]]);
      }));

      function exists(_x3) {
        return _ref3.apply(this, arguments);
      }

      return exists;
    }()
  }, {
    key: "getFiles",
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(path) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _asyncFile2.default.readdir(path);

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](0);
                throw "couldn't get files in folder: " + path + ", " + _context4.t0;

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 6]]);
      }));

      function getFiles(_x4) {
        return _ref4.apply(this, arguments);
      }

      return getFiles;
    }()
  }, {
    key: "createFolder",
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(path) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _asyncFile2.default.createDirectory(path);

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5["catch"](0);
                throw "couldn't create folder: " + path + ", " + _context5.t0;

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 6]]);
      }));

      function createFolder(_x5) {
        return _ref5.apply(this, arguments);
      }

      return createFolder;
    }()
  }, {
    key: "createFolderSync",
    value: function createFolderSync(path) {
      try {
        if (!_fs2.default.existsSync(path)) _fs2.default.mkdirSync(path);
      } catch (e) {
        throw "couldn't create folder: " + path + ", " + e;
      }
    }
  }]);

  return Files;
}();

exports.default = new Files();