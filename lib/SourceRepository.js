"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require("./sys/http");

var _http2 = _interopRequireDefault(_http);

var _PackageRepository2 = require("./PackageRepository");

var _PackageRepository3 = _interopRequireDefault(_PackageRepository2);

var _PackageRef = require("./PackageRef");

var _PackageRef2 = _interopRequireDefault(_PackageRef);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SourceRepository = function (_PackageRepository) {
  _inherits(SourceRepository, _PackageRepository);

  function SourceRepository(packageServer) {
    _classCallCheck(this, SourceRepository);

    var _this = _possibleConstructorReturn(this, (SourceRepository.__proto__ || Object.getPrototypeOf(SourceRepository)).call(this));

    _this.packageServer = packageServer;
    return _this;
  }

  /**
   * Checks if a package exists in the repository
   * @param {string} id Id of package to find
   * @param {string} [version] Version of package to find
   * @return {boolean}
   */


  _createClass(SourceRepository, [{
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
        var uri, result, feed;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                uri = "http://" + this.packageServer + "/api/v2/Packages()?$filter=Id%20eq%20%27" + id + "%27%20and%20IsLatestVersion%20eq%20true";

                if (version !== undefined) {
                  uri = "http://" + this.packageServer + "/api/v2/Packages()?$filter=Id%20eq%20%27" + id + "%27%20and%20Version%20eq%20%27" + version + "%27";
                }

                // call to server
                _context2.next = 4;
                return _http2.default.request({
                  uri: uri,
                  json: true
                });

              case 4:
                result = _context2.sent;

                if (result) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", null);

              case 7:
                feed = result.d.results[0];
                _context2.next = 10;
                return _PackageRef2.default.fromFeed(feed);

              case 10:
                return _context2.abrupt("return", _context2.sent);

              case 11:
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
     * Get packages using a keyword search
     * @param {string} [keywords] Keywords to search for
     * @param {bool} [latestOnly] Only get latestversions of packages (default=true)
     * @param {bool} [inclusive] Use and AND search on keywords instead of OR (default=true)
     * @return {PackageRef[]}
     */

  }, {
    key: "searchPackages",
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(keywords, latestOnly, inclusive) {
        var op, filter, idterms, words, latest, uri;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (keywords === undefined) keywords = "";
                if (inclusive === undefined) inclusive = true;
                if (latestOnly === undefined) latestOnly = true;

                op = inclusive ? "and" : "or";
                filter = "";
                idterms = "";
                words = keywords.split(" ");

                words.map(function (word) {
                  if (idterms != "") idterms += " " + op + " ";
                  if (word != "") {
                    idterms += "substringof('" + word + "',Id)";
                  }
                });

                latest = latestOnly ? "true" : "false";


                filter = "IsLatestVersion eq " + latest;

                if (idterms != "") {
                  filter += " and (" + idterms + ")";
                }

                _context3.next = 13;
                return this.filterPackages(filter);

              case 13:
                return _context3.abrupt("return", _context3.sent);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function searchPackages(_x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
      }

      return searchPackages;
    }()

    /**
     * Get packages using a filter string (odata $filter)
     * @param {string} filterString Filter string to use
     * @return {PackageRef[]}
     */

  }, {
    key: "filterPackages",
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(filterString) {
        var _this2 = this;

        var filter, uri, result, feeds;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (filterString === undefined) filterString = "";

                filter = "$filter=" + filterString;
                uri = "http://" + this.packageServer + "/api/v2/Packages()?" + filter;

                // call to server

                _context5.next = 5;
                return _http2.default.request({
                  uri: uri,
                  json: true
                });

              case 5:
                result = _context5.sent;
                feeds = result.d.results;
                return _context5.abrupt("return", Promise.all(feeds.map(function () {
                  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(feed) {
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return _PackageRef2.default.fromFeed(feed);

                          case 2:
                            return _context4.abrupt("return", _context4.sent);

                          case 3:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4, _this2);
                  }));

                  return function (_x9) {
                    return _ref5.apply(this, arguments);
                  };
                }())));

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function filterPackages(_x8) {
        return _ref4.apply(this, arguments);
      }

      return filterPackages;
    }()
  }]);

  return SourceRepository;
}(_PackageRepository3.default);

exports.default = SourceRepository;
//# sourceMappingURL=SourceRepository.js.map