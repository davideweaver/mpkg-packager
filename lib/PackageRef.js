"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xml = require("./sys/xml");

var _xml2 = _interopRequireDefault(_xml);

var _SemanticVersion = require("./SemanticVersion");

var _SemanticVersion2 = _interopRequireDefault(_SemanticVersion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PackageRef = function () {
  function PackageRef() {
    _classCallCheck(this, PackageRef);

    this.id = "";
    this.version = new _SemanticVersion2.default("0");
    this.authors = [];
    this.description = "";
    this.summary = "";
    this.releaseNotes = "";
    this.tags = [];
    this.isInstalled = false;
    this.dependencies = [];
  }

  _createClass(PackageRef, null, [{
    key: "fromMspec",
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(mspec) {
        var json, pkg, res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _xml2.default.toJson(mspec);

              case 3:
                json = _context.sent;
                pkg = json.package.metadata[0];
                res = new PackageRef();

                res.id = pkg.id[0];
                res.version = new _SemanticVersion2.default(pkg.version[0]);
                res.authors = pkg.authors;
                res.description = pkg.description[0];
                res.summary = pkg.summary[0];
                res.releaseNotes = pkg.releaseNotes[0];
                res.tags = pkg.tags[0].split(" ");
                res.isInstalled = true;
                res.dependencies = pkg.dependencies && pkg.dependencies.length > 0 ? pkg.dependencies[0].dependency.map(function (d) {
                  return d["$"].id;
                }) : [];

                return _context.abrupt("return", res);

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](0);
                throw "could not map mspec to PackageRef: " + mspec;

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 18]]);
      }));

      function fromMspec(_x) {
        return _ref.apply(this, arguments);
      }

      return fromMspec;
    }()
  }, {
    key: "fromFeed",
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(feed) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  try {
                    var res = new PackageRef();
                    res.id = feed.Id;
                    res.version = new _SemanticVersion2.default(feed.Version);
                    res.authors = [feed.Authors];
                    res.description = feed.Description;
                    res.summary = feed.Summary;
                    res.releaseNotes = feed.ReleaseNotes;
                    res.tags = feed.Tags ? feed.Tags.split(" ") : [];
                    res.isInstalled = false;
                    res.dependencies = feed.Dependencies ? feed.Dependencies.split("|") : [];

                    resolve(res);
                  } catch (e) {
                    reject(e);
                  }
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fromFeed(_x2) {
        return _ref2.apply(this, arguments);
      }

      return fromFeed;
    }()
  }]);

  return PackageRef;
}();

exports.default = PackageRef;
//# sourceMappingURL=PackageRef.js.map