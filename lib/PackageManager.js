"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require("./sys/http");

var _http2 = _interopRequireDefault(_http);

var _files = require("./sys/files");

var _files2 = _interopRequireDefault(_files);

var _admZip = require("adm-zip");

var _admZip2 = _interopRequireDefault(_admZip);

var _LocalRepository = require("./LocalRepository");

var _LocalRepository2 = _interopRequireDefault(_LocalRepository);

var _SourceRepository = require("./SourceRepository");

var _SourceRepository2 = _interopRequireDefault(_SourceRepository);

var _PackageRef = require("./PackageRef");

var _PackageRef2 = _interopRequireDefault(_PackageRef);

var _DependencyCache = require("./DependencyCache");

var _DependencyCache2 = _interopRequireDefault(_DependencyCache);

var _SemanticVersion = require("./SemanticVersion");

var _SemanticVersion2 = _interopRequireDefault(_SemanticVersion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PackageManager = function () {
  function PackageManager(packageServer) {
    _classCallCheck(this, PackageManager);

    this.packageServer = packageServer;
    this.localPackagesPath = "./packages";
    this._ensureLocalPackages();

    this.localRepository = new _LocalRepository2.default(this.localPackagesPath);
    this.sourceRepository = new _SourceRepository2.default(packageServer);
    this.dependencyCache = new _DependencyCache2.default();
  }

  _createClass(PackageManager, [{
    key: "installPackage",
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id, version, ignoreDependencies) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (ignoreDependencies) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return this._installPackageAndDependencies(id, version);

              case 3:
                _context.next = 7;
                break;

              case 5:
                _context.next = 7;
                return this._installPackage(id, version);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function installPackage(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return installPackage;
    }()

    /**
     * Uninstall a package
     * @param {string} id id of package to remove 
     * @param {bool} [forceRemove] remove package even if it's a dependency (default=false)
     * @param {bool} [removeDependencies] remove package's dependencies (default=true)
     */

  }, {
    key: "uninstallPackage",
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id, forceRemove, removeDependencies) {
        var path;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:

                if (forceRemove === undefined) forceRemove = false;
                if (removeDependencies === undefined) removeDependencies = true;

                // see if we are a dependent
                _context2.t0 = !forceRemove;

                if (!_context2.t0) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 6;
                return this._isInstalledPackageDependent(id);

              case 6:
                _context2.t0 = _context2.sent;

              case 7:
                if (!_context2.t0) {
                  _context2.next = 10;
                  break;
                }

                console.log("package " + id + " was not removed because it's a dependent, try forceRemove");
                return _context2.abrupt("return");

              case 10:

                // see if the package is installed
                path = this.localPackagesPath + "/" + id;
                _context2.next = 13;
                return _files2.default.exists(path);

              case 13:
                _context2.t1 = _context2.sent;

                if (!(_context2.t1 == false)) {
                  _context2.next = 17;
                  break;
                }

                console.log("package " + id + " was not removed because it's not installed");
                return _context2.abrupt("return");

              case 17:
                if (!removeDependencies) {
                  _context2.next = 22;
                  break;
                }

                _context2.next = 20;
                return this._removePackageAndDependencies(id);

              case 20:
                _context2.next = 24;
                break;

              case 22:
                _context2.next = 24;
                return this._removePackage(id);

              case 24:
                _context2.next = 26;
                return _files2.default.delete(path);

              case 26:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function uninstallPackage(_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return uninstallPackage;
    }()
  }, {
    key: "updatePackage",
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id, ignoreDependencies, showPrerelease) {
        var oldPackage, newPackage;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.localRepository.findPackage(id);

              case 2:
                oldPackage = _context3.sent;

                if (oldPackage) {
                  _context3.next = 5;
                  break;
                }

                throw "the package to update is not installed";

              case 5:
                newPackage = this.sourceRepository.findPackage(id);

                if (!(newPackage && !oldPackage.version.equalTo(newPackage.Version))) {
                  _context3.next = 11;
                  break;
                }

                _context3.next = 9;
                return this.uninstallPackage(id);

              case 9:
                _context3.next = 11;
                return this.installPackage(id);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function updatePackage(_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
      }

      return updatePackage;
    }()
  }, {
    key: "isInstalled",
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id, version) {
        var ver, installedPackage;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                ver = version != null ? new _SemanticVersion2.default(version) : null;
                _context4.next = 3;
                return this.localRepository.findPackage(id);

              case 3:
                installedPackage = _context4.sent;

                if (!(installedPackage != null)) {
                  _context4.next = 11;
                  break;
                }

                if (!(ver != null && installedPackage.version.greaterOrEqualTo(ver))) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt("return", true);

              case 9:
                if (!(ver == null)) {
                  _context4.next = 11;
                  break;
                }

                return _context4.abrupt("return", true);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function isInstalled(_x10, _x11) {
        return _ref4.apply(this, arguments);
      }

      return isInstalled;
    }()
  }, {
    key: "_ensureLocalPackages",
    value: function _ensureLocalPackages() {
      _files2.default.createFolderSync(this.localPackagesPath);
      _files2.default.createFolderSync(this.localPackagesPath + "/cache");
    }
  }, {
    key: "_getName",
    value: function _getName(id, version) {
      if (version !== undefined) return id + "-" + version;
      return id;
    }
  }, {
    key: "_downloadPackage",
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(id, version, downloadPath) {
        var uri, path;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                console.log("downloading package " + id + "-" + version);

                uri = "http://" + this.packageServer + "/api/v2/package/" + id;

                if (version !== undefined) {
                  uri += "/" + version;
                }

                _context5.next = 5;
                return _http2.default.downloadFile(uri, downloadPath);

              case 5:
                path = _context5.sent;
                _context5.next = 8;
                return _files2.default.exists(path);

              case 8:
                _context5.t0 = _context5.sent;

                if (!(_context5.t0 == false)) {
                  _context5.next = 11;
                  break;
                }

                throw "the package '${this._getName(id, version)}' could not be downloaded";

              case 11:
                return _context5.abrupt("return", path);

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _downloadPackage(_x12, _x13, _x14) {
        return _ref5.apply(this, arguments);
      }

      return _downloadPackage;
    }()
  }, {
    key: "_extractPackage",
    value: function _extractPackage(path, destPath) {
      var zip = new _admZip2.default(path);
      zip.extractAllTo(destPath, true);
    }
  }, {
    key: "_cleanupFile",
    value: function () {
      var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(path) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _files2.default.delete(path);

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _cleanupFile(_x15) {
        return _ref6.apply(this, arguments);
      }

      return _cleanupFile;
    }()

    /**
     * Reads a file from an .mpkg package (not installed)
     * @param {string} path path to .mpkg package file
     * @param {string} file name of file to read
     * @return {string} contents of file or null if file was not found
     */

  }, {
    key: "_readMpkgPackageFile",
    value: function _readMpkgPackageFile(path, file) {
      try {
        var data = null;
        var zip = new _admZip2.default(path);
        var zipEntries = zip.getEntries();
        zipEntries.forEach(function (zipEntry) {
          //console.log(zipEntry.entryName);
          if (zipEntry.entryName == file) {
            data = zipEntry.getData().toString('utf8');
          }
        });
        return data;
      } catch (e) {
        throw "cannot read package for '" + path + ":" + file + "': " + e;
      }
    }

    /**
     * Reads a file from an installed package
     * @param {string} id id of package
     * @param {string} file name of file to read
     * @return {string} contents of file or null if file was not found
     */

  }, {
    key: "_readInstalledPackageFile",
    value: function () {
      var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(id, file) {
        var data, installedPackage;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                data = null;
                _context7.next = 4;
                return this.localRepository.findPackage(id);

              case 4:
                installedPackage = _context7.sent;

                if (installedPackage) {
                  _context7.next = 9;
                  break;
                }

                _context7.next = 8;
                return _files2.default.read(this.localPackagesPath + "/" + id + "/" + file);

              case 8:
                data = _context7.sent;

              case 9:
                return _context7.abrupt("return", data);

              case 12:
                _context7.prev = 12;
                _context7.t0 = _context7["catch"](0);
                throw "cannot read installed package for '" + id + ":" + file + "': " + _context7.t0;

              case 15:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 12]]);
      }));

      function _readInstalledPackageFile(_x16, _x17) {
        return _ref7.apply(this, arguments);
      }

      return _readInstalledPackageFile;
    }()
  }, {
    key: "_getPackageDependencies",
    value: function () {
      var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(id, version) {
        var cacheKey, deps, tmpPath, path, mspec;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;

                // check cache
                cacheKey = this._getName(id, version);
                _context8.next = 4;
                return this.dependencyCache.get(cacheKey);

              case 4:
                deps = _context8.sent;

                if (!(true || !deps)) {
                  _context8.next = 20;
                  break;
                }

                //console.log(`- dependency cache MISS: ${cacheKey}`)
                deps = [];
                tmpPath = this.localPackagesPath + "/tmp-" + id + "-" + version + ".mpkg";
                _context8.next = 10;
                return this._downloadPackage(id, version, tmpPath);

              case 10:
                path = _context8.sent;
                mspec = this._readMpkgPackageFile(tmpPath, id + ".mspec");
                _context8.next = 14;
                return this._cleanupFile(tmpPath);

              case 14:
                if (!mspec) {
                  _context8.next = 20;
                  break;
                }

                _context8.next = 17;
                return _PackageRef2.default.fromMspec(mspec);

              case 17:
                deps = _context8.sent.dependencies;
                _context8.next = 20;
                return this.dependencyCache.set(cacheKey, deps);

              case 20:
                return _context8.abrupt("return", deps);

              case 23:
                _context8.prev = 23;
                _context8.t0 = _context8["catch"](0);
                throw "cannot get dependencies for '" + this._getName(id, version) + "': " + _context8.t0;

              case 26:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 23]]);
      }));

      function _getPackageDependencies(_x18, _x19) {
        return _ref8.apply(this, arguments);
      }

      return _getPackageDependencies;
    }()
  }, {
    key: "_getInstalledPackageDependencies",
    value: function () {
      var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(id) {
        var installedPackage;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return this.localRepository.findPackage(id);

              case 3:
                installedPackage = _context9.sent;

                if (installedPackage) {
                  _context9.next = 6;
                  break;
                }

                return _context9.abrupt("return", installedPackage.dependencies);

              case 6:
                return _context9.abrupt("return", []);

              case 9:
                _context9.prev = 9;
                _context9.t0 = _context9["catch"](0);
                throw "cannot get dependencies for installed package '" + this._getName(id, version) + "': " + _context9.t0;

              case 12:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 9]]);
      }));

      function _getInstalledPackageDependencies(_x20) {
        return _ref9.apply(this, arguments);
      }

      return _getInstalledPackageDependencies;
    }()
  }, {
    key: "_installPackage",
    value: function () {
      var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(id, version) {
        var tmpPath, pkgPath, path;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                console.log("installing: " + this._getName(id, version));

                _context10.t0 = version;

                if (!_context10.t0) {
                  _context10.next = 6;
                  break;
                }

                _context10.next = 5;
                return this.isInstalled(id, version);

              case 5:
                _context10.t0 = _context10.sent;

              case 6:
                if (!_context10.t0) {
                  _context10.next = 9;
                  break;
                }

                console.log("- already installed");
                return _context10.abrupt("return");

              case 9:
                tmpPath = this.localPackagesPath + "/downloaded.mpkg";
                pkgPath = this.localPackagesPath + "/" + id;
                _context10.next = 13;
                return this._downloadPackage(id, version, tmpPath);

              case 13:
                path = _context10.sent;

                this._extractPackage(path, pkgPath);
                _context10.next = 17;
                return this._cleanupFile(tmpPath);

              case 17:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function _installPackage(_x21, _x22) {
        return _ref10.apply(this, arguments);
      }

      return _installPackage;
    }()
  }, {
    key: "_installPackageAndDependencies",
    value: function () {
      var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(id, version) {
        var deps, i;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return this._getPackageDependencies(id, version);

              case 3:
                deps = _context11.sent;
                i = 0;

              case 5:
                if (!(i < deps.length)) {
                  _context11.next = 11;
                  break;
                }

                _context11.next = 8;
                return this._installPackageAndDependencies(deps[i]);

              case 8:
                i++;
                _context11.next = 5;
                break;

              case 11:
                _context11.next = 13;
                return this._installPackage(id, version);

              case 13:
                _context11.next = 18;
                break;

              case 15:
                _context11.prev = 15;
                _context11.t0 = _context11["catch"](0);
                throw "cannot install dependencies for '" + this._getName(id, version) + "': " + _context11.t0;

              case 18:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[0, 15]]);
      }));

      function _installPackageAndDependencies(_x23, _x24) {
        return _ref11.apply(this, arguments);
      }

      return _installPackageAndDependencies;
    }()
  }, {
    key: "_removePackage",
    value: function () {
      var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee12(id) {
        var path;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                console.log("removing: " + this._getName(id));
                path = this.localPackagesPath + "/" + id;
                _context12.next = 4;
                return _files2.default.delete(path);

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function _removePackage(_x25) {
        return _ref12.apply(this, arguments);
      }

      return _removePackage;
    }()
  }, {
    key: "_removePackageAndDependencies",
    value: function () {
      var _ref13 = _asyncToGenerator(regeneratorRuntime.mark(function _callee13(id) {
        var installedPackage, deps, i;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                _context13.next = 3;
                return this.localRepository.findPackage(id);

              case 3:
                installedPackage = _context13.sent;

                if (!installedPackage) {
                  _context13.next = 15;
                  break;
                }

                deps = installedPackage.dependencies;
                i = 0;

              case 7:
                if (!(i < deps.length)) {
                  _context13.next = 13;
                  break;
                }

                _context13.next = 10;
                return this._removePackageAndDependencies(deps[i]);

              case 10:
                i++;
                _context13.next = 7;
                break;

              case 13:
                _context13.next = 15;
                return this._removePackage(id);

              case 15:
                _context13.next = 20;
                break;

              case 17:
                _context13.prev = 17;
                _context13.t0 = _context13["catch"](0);
                throw "cannot remove dependencies for '" + this._getName(id, version) + "': " + _context13.t0;

              case 20:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[0, 17]]);
      }));

      function _removePackageAndDependencies(_x26) {
        return _ref13.apply(this, arguments);
      }

      return _removePackageAndDependencies;
    }()
  }, {
    key: "_isInstalledPackageDependent",
    value: function () {
      var _ref14 = _asyncToGenerator(regeneratorRuntime.mark(function _callee14(id) {
        var installedPackages, i;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.prev = 0;
                _context14.next = 3;
                return this.localRepository.getPackages();

              case 3:
                installedPackages = _context14.sent;
                i = 0;

              case 5:
                if (!(i < installedPackages.length)) {
                  _context14.next = 11;
                  break;
                }

                if (!installedPackages[i].dependencies.includes(id)) {
                  _context14.next = 8;
                  break;
                }

                return _context14.abrupt("return", true);

              case 8:
                i++;
                _context14.next = 5;
                break;

              case 11:
                return _context14.abrupt("return", false);

              case 14:
                _context14.prev = 14;
                _context14.t0 = _context14["catch"](0);
                throw "cannot check if package is dependent for '" + id + "': " + _context14.t0;

              case 17:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this, [[0, 14]]);
      }));

      function _isInstalledPackageDependent(_x27) {
        return _ref14.apply(this, arguments);
      }

      return _isInstalledPackageDependent;
    }()
  }]);

  return PackageManager;
}();

exports.default = PackageManager;