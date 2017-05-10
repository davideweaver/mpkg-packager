"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _files = require("./sys/files");

var _files2 = _interopRequireDefault(_files);

var _xml = require("./sys/xml");

var _xml2 = _interopRequireDefault(_xml);

var _PackageRepository2 = require("./PackageRepository");

var _PackageRepository3 = _interopRequireDefault(_PackageRepository2);

var _PackageRef = require("./PackageRef");

var _PackageRef2 = _interopRequireDefault(_PackageRef);

var _SemanticVersion = require("./SemanticVersion");

var _SemanticVersion2 = _interopRequireDefault(_SemanticVersion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocalRepository = function (_PackageRepository) {
  _inherits(LocalRepository, _PackageRepository);

  function LocalRepository(localPackagesPath) {
    _classCallCheck(this, LocalRepository);

    var _this = _possibleConstructorReturn(this, (LocalRepository.__proto__ || Object.getPrototypeOf(LocalRepository)).call(this));

    _this.localPackagesPath = localPackagesPath;
    return _this;
  }

  /**
   * Checks if a package exists in the repository
   * @param {string} id Id of package to find
   * @param {string} [version] Version of package to find
   * @return {boolean}
   */


  _createClass(LocalRepository, [{
    key: "exists",
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id, version) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.findPackage(id, version) != null);

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
        var mspec, pkg;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _files2.default.read(this.localPackagesPath + "/" + id + "/" + id + ".mspec");

              case 3:
                mspec = _context2.sent;
                _context2.next = 6;
                return _PackageRef2.default.fromMspec(mspec);

              case 6:
                pkg = _context2.sent;

                if (!(version !== undefined)) {
                  _context2.next = 10;
                  break;
                }

                if (pkg.version.equalTo(new _SemanticVersion2.default(version))) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt("return", false);

              case 10:
                return _context2.abrupt("return", pkg);

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", null);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 13]]);
      }));

      function findPackage(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return findPackage;
    }()

    /**
     * Get packages in the repository
     * @return {PackageRef[]}
     */

  }, {
    key: "getPackages",
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var _this2 = this;

        var base, pkgs, folders;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                base = this;
                pkgs = [];
                _context4.next = 4;
                return _files2.default.getFiles(this.localPackagesPath);

              case 4:
                folders = _context4.sent;
                _context4.next = 7;
                return Promise.all(folders.map(function () {
                  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(f) {
                    var pkg;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return _this2.findPackage(f);

                          case 2:
                            pkg = _context3.sent;

                            if (pkg) pkgs.push(pkg);

                          case 4:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3, _this2);
                  }));

                  return function (_x5) {
                    return _ref4.apply(this, arguments);
                  };
                }()));

              case 7:
                return _context4.abrupt("return", pkgs);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getPackages() {
        return _ref3.apply(this, arguments);
      }

      return getPackages;
    }()
  }]);

  return LocalRepository;
}(_PackageRepository3.default);

exports.default = LocalRepository;