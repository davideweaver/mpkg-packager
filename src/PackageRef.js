import xml from "./sys/xml"

import SemanticVersion from "./SemanticVersion"

export default class PackageRef {

  constructor() {
    this.id = "";
    this.version = new SemanticVersion("0");
    this.authors = [];
    this.description = "";
    this.summary = "";
    this.releaseNotes = "";
    this.tags = [];
    this.isInstalled = false;
    this.dependencies = [];
  }

  static async fromMspec(mspec) {
    try {
      let json = await xml.toJson(mspec);
      let pkg = json.package.metadata[0];

      let res = new PackageRef();
      res.id = pkg.id[0];
      res.version = new SemanticVersion(pkg.version[0]);
      res.authors = pkg.authors;
      res.description = pkg.description[0];
      res.summary = pkg.summary[0];
      res.releaseNotes = pkg.releaseNotes[0];
      res.tags = pkg.tags[0].split(" ");
      res.isInstalled = true;
      res.dependencies = (pkg.dependencies && pkg.dependencies.length > 0) ? pkg.dependencies[0].dependency.map(d => d["$"].id) : [];

      return res;
    }
    catch (e) {
      throw `could not map mspec to PackageRef: ${mspec}`
    }
  }

  static async fromFeed(feed) {
    return new Promise((resolve, reject) => {
      try {
        let res = new PackageRef();
        res.id = feed.Id;
        res.version = new SemanticVersion(feed.Version);
        res.authors = [feed.Authors];
        res.description = feed.Description;
        res.summary = feed.Summary;
        res.releaseNotes = feed.ReleaseNotes;
        res.tags = feed.Tags ? feed.Tags.split(" ") : [];
        res.isInstalled = false;
        res.dependencies = feed.Dependencies ? feed.Dependencies.split("|") : [];

        resolve(res);
      }
      catch (e) {
        reject(e);
      }
    })
  }

}