"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PackageManager = require("./PackageManager");

var _PackageManager2 = _interopRequireDefault(_PackageManager);

var _SemanticVersion = require("./SemanticVersion");

var _SemanticVersion2 = _interopRequireDefault(_SemanticVersion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Packager = function () {
  function Packager(packageServer) {
    _classCallCheck(this, Packager);

    this.showPrerelease = false;
    this.packageServer = packageServer;
    this.packageManager = new _PackageManager2.default(packageServer);
  }

  _createClass(Packager, [{
    key: "installPackage",
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id, version, ignoreDependencies) {
        var ver, installedPackage;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (ignoreDependencies === undefined) ignoreDependencies = false;

                ver = version != null ? new _SemanticVersion2.default(version) : null;

                console.log("installing: package=" + id + ", version=" + (ver && ver.toString()));

                _context.prev = 3;
                _context.next = 6;
                return this.packageManager.localRepository.findPackage(id);

              case 6:
                installedPackage = _context.sent;

                if (!installedPackage) {
                  _context.next = 19;
                  break;
                }

                console.log("- found:", installedPackage.id, installedPackage.version.toString());

                if (!(ver && installedPackage.version.greaterOrEqualTo(ver))) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", false);

              case 13:
                _context.next = 15;
                return this.packageManager.sourceRepository.exists(id, version);

              case 15:
                if (!_context.sent) {
                  _context.next = 19;
                  break;
                }

                console.log("- removing old:", installedPackage.id, installedPackage.version.toString());
                // If the package is already installed, but
                // (a) the version we require is different from the one that is installed, 
                // (b) side-by-side is disabled
                // we need to uninstall it.
                // However, before uninstalling, make sure the package exists in the source repository. 
                _context.next = 19;
                return this.packageManager.uninstallPackage(id);

              case 19:
                _context.next = 21;
                return this.packageManager.installPackage(id, version, ignoreDependencies);

              case 21:
                _context.next = 27;
                break;

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](3);

                console.error("- could not install: " + id + " (" + _context.t0 + ")");
                return _context.abrupt("return", false);

              case 27:
                return _context.abrupt("return", true);

              case 28:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 23]]);
      }));

      function installPackage(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return installPackage;
    }()
  }, {
    key: "uninstallPackage",
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id, version) {
        var ver, installedPackage;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                ver = version != null ? new _SemanticVersion2.default(version) : null;

                console.log("uninstalling: package=" + id + ", version=" + (ver && ver.toString()));

                _context2.prev = 2;
                _context2.next = 5;
                return this.packageManager.localRepository.findPackage(id);

              case 5:
                installedPackage = _context2.sent;

                if (!installedPackage) {
                  _context2.next = 12;
                  break;
                }

                console.log("- found:", installedPackage.id, installedPackage.version.toString());

                if (!(ver && !installedPackage.version.equalTo(ver))) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt("return", false);

              case 10:
                _context2.next = 12;
                return this.packageManager.uninstallPackage(id, true, true);

              case 12:
                _context2.next = 18;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](2);

                console.error("- could not uninstall: " + id + " (" + _context2.t0 + ")");
                return _context2.abrupt("return", false);

              case 18:
                return _context2.abrupt("return", true);

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 14]]);
      }));

      function uninstallPackage(_x4, _x5) {
        return _ref2.apply(this, arguments);
      }

      return uninstallPackage;
    }()
  }, {
    key: "updatePackage",
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id, ignoreDependencies) {
        var availablePackage, installedPackage;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:

                console.log("updating: package=" + id);

                _context3.prev = 1;
                _context3.next = 4;
                return this.packageManager.sourceRepository.findPackage(id);

              case 4:
                availablePackage = _context3.sent;

                if (!(availablePackage == null)) {
                  _context3.next = 8;
                  break;
                }

                console.log("- package " + id + " was not found");
                return _context3.abrupt("return", false);

              case 8:
                _context3.next = 10;
                return this.packageManager.localRepository.findPackage(id);

              case 10:
                installedPackage = _context3.sent;

                if (!(installedPackage != null)) {
                  _context3.next = 16;
                  break;
                }

                console.log("- found:", installedPackage.id, installedPackage.version.toString());

                if (!availablePackage.version.lessOrEqualTo(installedPackage.version)) {
                  _context3.next = 16;
                  break;
                }

                console.log("- package " + availablePackage.version.toString() + " is the latest version");
                return _context3.abrupt("return", true);

              case 16:
                if (installedPackage) {
                  _context3.next = 21;
                  break;
                }

                _context3.next = 19;
                return this.packageManager.installPackage(id, availablePackage.version.toString(), ignoreDependencies, this.showPrerelease);

              case 19:
                _context3.next = 23;
                break;

              case 21:
                _context3.next = 23;
                return this.packageManager.updatePackage(id, !ignoreDependencies, this.showPrerelease);

              case 23:
                _context3.next = 29;
                break;

              case 25:
                _context3.prev = 25;
                _context3.t0 = _context3["catch"](1);

                console.error("- could not update: " + id + " (" + _context3.t0 + ")");
                return _context3.abrupt("return", false);

              case 29:
                return _context3.abrupt("return", true);

              case 30:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 25]]);
      }));

      function updatePackage(_x6, _x7) {
        return _ref3.apply(this, arguments);
      }

      return updatePackage;
    }()
  }, {
    key: "isUpdateAvailable",
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id, version) {
        var ver, installedPackage, availablePackageVersion;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                ver = version != null ? new _SemanticVersion2.default(version) : null;
                _context4.prev = 1;

                if (!(ver == null)) {
                  _context4.next = 13;
                  break;
                }

                _context4.next = 5;
                return this.packageManager.localRepository.findPackage(id);

              case 5:
                installedPackage = _context4.sent;

                if (!installedPackage) {
                  _context4.next = 11;
                  break;
                }

                console.log("- found:", installedPackage.id, installedPackage.version.toString());
                ver = installedPackage.version;
                _context4.next = 13;
                break;

              case 11:
                console.log("- not found: " + installedPackage.id);
                return _context4.abrupt("return", false);

              case 13:
                _context4.t0 = _SemanticVersion2.default;
                _context4.next = 16;
                return this.getLatestVersion(id);

              case 16:
                _context4.t1 = _context4.sent;
                availablePackageVersion = new _context4.t0(_context4.t1);

                if (!availablePackageVersion.greaterTo(ver)) {
                  _context4.next = 20;
                  break;
                }

                return _context4.abrupt("return", true);

              case 20:
                _context4.next = 26;
                break;

              case 22:
                _context4.prev = 22;
                _context4.t2 = _context4["catch"](1);

                console.error("- could not query availability: " + id + " (" + _context4.t2 + ")");
                return _context4.abrupt("return", false);

              case 26:
                return _context4.abrupt("return", false);

              case 27:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 22]]);
      }));

      function isUpdateAvailable(_x8, _x9) {
        return _ref4.apply(this, arguments);
      }

      return isUpdateAvailable;
    }()
  }, {
    key: "isInstalled",
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(id, version) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this.packageManager.isInstalled(id, version);

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5["catch"](0);

                console.error("could not find '" + id + "' (" + _context5.t0 + ")");

              case 9:
                return _context5.abrupt("return", false);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 6]]);
      }));

      function isInstalled(_x10, _x11) {
        return _ref5.apply(this, arguments);
      }

      return isInstalled;
    }()
  }, {
    key: "getInstalledPackage",
    value: function () {
      var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(id) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return this.packageManager.localRepository.findPackage(id);

              case 3:
                return _context6.abrupt("return", _context6.sent);

              case 6:
                _context6.prev = 6;
                _context6.t0 = _context6["catch"](0);

                console.error("error getting installed package '" + id + "' (" + _context6.t0 + ")");

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 6]]);
      }));

      function getInstalledPackage(_x12) {
        return _ref6.apply(this, arguments);
      }

      return getInstalledPackage;
    }()
  }, {
    key: "getInstalledPackages",
    value: function () {
      var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return this.packageManager.localRepository.getPackages();

              case 3:
                return _context7.abrupt("return", _context7.sent);

              case 6:
                _context7.prev = 6;
                _context7.t0 = _context7["catch"](0);

                console.error("error getting installed packages (" + _context7.t0 + ")");

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 6]]);
      }));

      function getInstalledPackages() {
        return _ref7.apply(this, arguments);
      }

      return getInstalledPackages;
    }()

    /**
     * Get the version of the latest package
     * @param {string} id id of package to query
     * @return {string} version of latest package or null
     */

  }, {
    key: "getLatestVersion",
    value: function () {
      var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(id) {
        var availablePackage;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return this.packageManager.sourceRepository.findPackage(id);

              case 3:
                availablePackage = _context8.sent;

                if (!availablePackage) {
                  _context8.next = 6;
                  break;
                }

                return _context8.abrupt("return", availablePackage.version.toString());

              case 6:
                _context8.next = 11;
                break;

              case 8:
                _context8.prev = 8;
                _context8.t0 = _context8["catch"](0);

                console.error("could not query '" + id + "' version (" + _context8.t0 + ")");

              case 11:
                return _context8.abrupt("return", null);

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 8]]);
      }));

      function getLatestVersion(_x13) {
        return _ref8.apply(this, arguments);
      }

      return getLatestVersion;
    }()

    /**
     * Gets packages from server using a keyword search
     * @param {string} keywords keywords to search package ids
     * @param {bool} onlyLatest get only latest versions of matching packages
     * @param {bool} inclusive search using AND instead of OR for multiple keywords
     * @return {PackageRef[]}
     */

  }, {
    key: "getAvailablePackagesByKeywords",
    value: function () {
      var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(keywords, onlyLatest, inclusive) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return this.packageManager.sourceRepository.searchPackages(keywords, onlyLatest, inclusive);

              case 3:
                return _context9.abrupt("return", _context9.sent);

              case 6:
                _context9.prev = 6;
                _context9.t0 = _context9["catch"](0);

                console.error("could not query '" + keywords + "' (" + _context9.t0 + ")");

              case 9:
                return _context9.abrupt("return", null);

              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 6]]);
      }));

      function getAvailablePackagesByKeywords(_x14, _x15, _x16) {
        return _ref9.apply(this, arguments);
      }

      return getAvailablePackagesByKeywords;
    }()

    /**
     * Gets packages from server using an ODATA $filter string
     * @param {string} filter ODATA $filter string
     * @return {PackageRef[]}
     */

  }, {
    key: "getAvailablePackagesByFilter",
    value: function () {
      var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(filter) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return this.packageManager.sourceRepository.filterPackages(filter);

              case 3:
                return _context10.abrupt("return", _context10.sent);

              case 6:
                _context10.prev = 6;
                _context10.t0 = _context10["catch"](0);

                console.error("could not filter '" + filter + "' (" + _context10.t0 + ")");

              case 9:
                return _context10.abrupt("return", null);

              case 10:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 6]]);
      }));

      function getAvailablePackagesByFilter(_x17) {
        return _ref10.apply(this, arguments);
      }

      return getAvailablePackagesByFilter;
    }()
  }]);

  return Packager;
}();

exports.default = Packager;
//# sourceMappingURL=Packager.js.map