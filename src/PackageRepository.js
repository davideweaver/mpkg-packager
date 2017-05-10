export default class PackageRepository {

  /**
   * Checks if a package exists in the repository
   * @param {string} id Id of package to find
   * @param {string} [version] Version of package to find
   * @return {boolean}
   */
  async exists(id, version) {
    return false;
  }

  /**
   * Finds a package in the repository
   * @param {string} id Id of package to find
   * @param {string} [version] Version of package to find
   * @return {PackageRef}
   */
  async findPackage(id, version) {
    return null;
  }

  /**
   * Get packages in the repository
   */
  async getPackages() {
    return [];
  }

}