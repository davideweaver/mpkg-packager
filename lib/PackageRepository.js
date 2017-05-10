"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PackageRepository = function () {
  function PackageRepository() {
    _classCallCheck(this, PackageRepository);
  }

  _createClass(PackageRepository, [{
    key: "exists",


    /**
     * Checks if a package exists in the repository
     * @param {string} id Id of package to find
     * @param {string} [version] Version of package to find
     * @return {boolean}
     */
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id, version) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", false);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function exists(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return exists;
    }()

    /**
     * Finds a package in the repository
     * @param {string} id Id of package to find
     * @param {string} [version] Version of package to find
     * @return {PackageRef}
     */

  }, {
    key: "findPackage",
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id, version) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", null);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function findPackage(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return findPackage;
    }()

    /**
     * Get packages in the repository
     */

  }, {
    key: "getPackages",
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", []);

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getPackages() {
        return _ref3.apply(this, arguments);
      }

      return getPackages;
    }()
  }]);

  return PackageRepository;
}();

exports.default = PackageRepository;
//# sourceMappingURL=PackageRepository.js.map