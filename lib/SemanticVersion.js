"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SemanticVersion = function () {
  function SemanticVersion(versionString) {
    _classCallCheck(this, SemanticVersion);

    this.major = null;
    this.minor = null;
    this.build = null;
    this.revision = null;

    if (versionString === undefined || versionString == "") versionString = "0";

    var ar = versionString.split(".");

    if (ar.length >= 1 && ar[0] != "") {
      this.major = this._tryParseInt(ar[0]);
    }
    if (ar.length >= 2 && ar[1] != "") {
      this.minor = this._tryParseInt(ar[1]);
    }
    if (ar.length >= 3 && ar[2] != "") {
      this.build = this._tryParseInt(ar[2]);
    }
    if (ar.length >= 4 && ar[3] != "") {
      this.revision = this._tryParseInt(ar[3]);
    }
  }

  _createClass(SemanticVersion, [{
    key: "_tryParseInt",
    value: function _tryParseInt(val) {
      var res = parseInt(val);
      if (isNaN(res)) throw new Error("invalid value: " + val);
      return res;
    }
  }, {
    key: "toString",
    value: function toString() {
      var res = "" + this.major;
      if (this.minor) res += "." + this.minor;
      if (this.build) res += "." + this.build;
      if (this.revision) res += "." + this.revision;
      return res;
    }
  }, {
    key: "equalTo",
    value: function equalTo(version) {
      //console.log("equalTo", this.compareTo(version))
      return this.compareTo(version) == 0;
    }
  }, {
    key: "greaterTo",
    value: function greaterTo(version) {
      //console.log("greaterTo", this.compareTo(version))
      return this.compareTo(version) > 0;
    }
  }, {
    key: "greaterOrEqualTo",
    value: function greaterOrEqualTo(version) {
      //console.log("greaterOrEqualTo", this.compareTo(version))
      return this.compareTo(version) >= 0;
    }
  }, {
    key: "lessOrEqualTo",
    value: function lessOrEqualTo(version) {
      console.log("lessOrEqualTo", this.compareTo(version));
      return this.compareTo(version) <= 0;
    }
  }, {
    key: "compareTo",
    value: function compareTo(version) {
      if (!version) return 1;

      if (this.major > version.major) return 1;

      if (this.major < version.major) return -1;

      if (this.minor > version.minor) return 1;

      if (this.minor < version.minor) return -1;

      if (this.build > version.build) return 1;

      if (this.build < version.build) return -1;

      if (this.revision > version.revision) return 1;

      if (this.revision < version.revision) return -1;

      return 0;
    }
  }]);

  return SemanticVersion;
}();

exports.default = SemanticVersion;