
export default class SemanticVersion {

  constructor(versionString) {
    this.major = null;
    this.minor = null;
    this.build = null;
    this.revision = null;

    if (versionString === undefined || versionString == "")
      versionString = "0";

    let ar = versionString.split(".");

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

  _tryParseInt(val) {
    let res = parseInt(val);
    if (isNaN(res))
      throw new Error(`invalid value: ${val}`);
    return res;
  }

  toString() {
    let res = "" + this.major;
    if (this.minor)
      res += "." + this.minor;
    if (this.build)
      res += "." + this.build;
    if (this.revision)
      res += "." + this.revision;
    return res;
  }

  equalTo(version) {
    //console.log("equalTo", this.compareTo(version))
    return this.compareTo(version) == 0;
  }

  greaterTo(version) {
    //console.log("greaterTo", this.compareTo(version))
    return this.compareTo(version) > 0;
  }

  greaterOrEqualTo(version) {
    //console.log("greaterOrEqualTo", this.compareTo(version))
    return this.compareTo(version) >= 0;
  }

  lessOrEqualTo(version) {
    console.log("lessOrEqualTo", this.compareTo(version))
    return this.compareTo(version) <= 0;
  }

  compareTo(version) {
    if (!version)
      return 1;

    if (this.major > version.major)
      return 1;

    if (this.major < version.major)
      return -1;

    if (this.minor > version.minor)
      return 1;

    if (this.minor < version.minor)
      return -1;

    if (this.build > version.build)
      return 1;

    if (this.build < version.build)
      return -1;

    if (this.revision > version.revision)
      return 1;

    if (this.revision < version.revision)
      return -1;

    return 0;
  }
}