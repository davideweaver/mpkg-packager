import files from "./sys/files"
import xml from "./sys/xml"

import PackageRepository from "./PackageRepository"
import PackageRef from "./PackageRef"
import SemanticVersion from "./SemanticVersion"

export default class LocalRepository extends PackageRepository {

  constructor(localPackagesPath) {
    super();
    this.localPackagesPath = localPackagesPath;
  }

  /**
   * Checks if a package exists in the repository
   * @param {string} id Id of package to find
   * @param {string} [version] Version of package to find
   * @return {boolean}
   */
  async exists(id, version) {
    return this.findPackage(id, version) != null;
  }

  /**
   * Finds a package in the repository
   * @param {string} id Id of package to find
   * @param {string} [version] Version of package to find
   * @return {PackageRef}
   */
  async findPackage(id, version) {
    try {
      // find the mspec
      let mspec = await files.read(`${this.localPackagesPath}/${id}/${id}.mspec`);
      let pkg = await PackageRef.fromMspec(mspec);

      // if we're looking for a specific version, check it
      if (version !== undefined) {
        if (!pkg.version.equalTo(new SemanticVersion(version)))
          return false;
      }
      return pkg;
    }
    catch (e) {
      return null;
    }
  }

  /**
   * Get packages in the repository
   * @return {PackageRef[]}
   */
  async getPackages() {
    let base = this;
    let pkgs = [];
    let folders = await files.getFiles(this.localPackagesPath);
    await Promise.all(folders.map(async f => {
      let pkg = await this.findPackage(f);
      if (pkg)
        pkgs.push(pkg);
    }));
    return pkgs;
  }

}