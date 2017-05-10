import PackageManager from "./PackageManager"
import SemanticVersion from "./SemanticVersion"

export default class Packager {

  constructor(packageServer) {
    this.showPrerelease = false;
    this.packageServer = packageServer;
    this.packageManager = new PackageManager(packageServer);
  }

  async installPackage(id, version, ignoreDependencies) {
    if (ignoreDependencies === undefined)
      ignoreDependencies = false;

      const ver = version != null ? new SemanticVersion(version) : null;
      console.log(`installing: package=${id}, version=${ver && ver.toString()}`);

      try {

        let installedPackage = await this.packageManager.localRepository.findPackage(id);
        if (installedPackage) {
          console.log("- found:", installedPackage.id, installedPackage.version.toString());
          if (ver && installedPackage.version.greaterOrEqualTo(ver)) {
            // If the package is already installed (or the version being installed is lower), then we do not need to do anything. 
            return false;
          }
          else if (await this.packageManager.sourceRepository.exists(id, version)) {
            console.log("- removing old:", installedPackage.id, installedPackage.version.toString());
            // If the package is already installed, but
            // (a) the version we require is different from the one that is installed, 
            // (b) side-by-side is disabled
            // we need to uninstall it.
            // However, before uninstalling, make sure the package exists in the source repository. 
            await this.packageManager.uninstallPackage(id);
          }
        }

        await this.packageManager.installPackage(id, version, ignoreDependencies);

      }
      catch (e) {
        console.error(`- could not install: ${id} (${e})`);
        return false;
      }

      return true;
  }

  async uninstallPackage(id, version) {

    const ver = version != null ? new SemanticVersion(version) : null;
    console.log(`uninstalling: package=${id}, version=${ver && ver.toString()}`);

    try {

      let installedPackage = await this.packageManager.localRepository.findPackage(id);
      if (installedPackage) {
        console.log("- found:", installedPackage.id, installedPackage.version.toString());
        if (ver && !installedPackage.version.equalTo(ver)) {
          return false;
        }
        await this.packageManager.uninstallPackage(id, true, true);
      }
    }
    catch (e) {
      console.error(`- could not uninstall: ${id} (${e})`);
      return false;
    }

    return true;
  }

  async updatePackage(id, ignoreDependencies) {

    console.log(`updating: package=${id}`);

    try {

      var availablePackage = await this.packageManager.sourceRepository.findPackage(id);
      if (availablePackage == null) {
        console.log(`- package ${id} was not found`);
        return false;
      }
				
      var installedPackage = await this.packageManager.localRepository.findPackage(id);
      if (installedPackage != null) {
        console.log("- found:", installedPackage.id, installedPackage.version.toString());
        if (availablePackage.version.lessOrEqualTo(installedPackage.version))
        {
          console.log(`- package ${availablePackage.version.toString()} is the latest version`);
          return true;
        }
      }
				
      if (!installedPackage)
      {
        await this.packageManager.installPackage(id, availablePackage.version.toString(), ignoreDependencies, this.showPrerelease);
      }
      else
      {
        await this.packageManager.updatePackage(id, !ignoreDependencies, this.showPrerelease);
      }
    }
    catch (e) {
      console.error(`- could not update: ${id} (${e})`);
      return false;
    }

    return true;
  }

  async isUpdateAvailable(id, version) {

    let ver = version != null ? new SemanticVersion(version) : null;

    try {

      if (ver == null) {
        let installedPackage = await this.packageManager.localRepository.findPackage(id);
        if (installedPackage) {
          console.log("- found:", installedPackage.id, installedPackage.version.toString());
          ver = installedPackage.version;	
        }
        else {
          console.log(`- not found: ${installedPackage.id}`);
          return false;
        }
      }

      var availablePackageVersion = new SemanticVersion(await this.getLatestVersion(id));
      if (availablePackageVersion.greaterTo(ver)) {
        return true;
      }
    }
    catch (e) {
      console.error(`- could not query availability: ${id} (${e})`);
      return false;
    }

    return false;
  }

  async isInstalled(id, version) {

    try {
      return await this.packageManager.isInstalled(id, version);
    }
    catch (e) {
      console.error(`could not find '${id}' (${e})`);
    }

    return false;
  }

  async getInstalledPackage(id) {

    try {
      return await this.packageManager.localRepository.findPackage(id);
    }
    catch (e) {
      console.error(`error getting installed package '${id}' (${e})`);
    }
  }

  async getInstalledPackages() {

    try {
      return await this.packageManager.localRepository.getPackages();
    }
    catch (e) {
      console.error(`error getting installed packages (${e})`);
    }
  }

  /**
   * Get the version of the latest package
   * @param {string} id id of package to query
   * @return {string} version of latest package or null
   */
  async getLatestVersion(id) {
    try {
      var availablePackage = await this.packageManager.sourceRepository.findPackage(id);
      if (availablePackage)
      {
        return availablePackage.version.toString();
      }
    }
    catch (e) {
      console.error(`could not query '${id}' version (${e})`);
    }

    return null;
  }

  /**
   * Gets packages from server using a keyword search
   * @param {string} keywords keywords to search package ids
   * @param {bool} onlyLatest get only latest versions of matching packages
   * @param {bool} inclusive search using AND instead of OR for multiple keywords
   * @return {PackageRef[]}
   */
  async getAvailablePackagesByKeywords(keywords, onlyLatest, inclusive) {
    try {
      return await this.packageManager.sourceRepository.searchPackages(keywords, onlyLatest, inclusive)
    }
    catch (e) {
      console.error(`could not query '${keywords}' (${e})`);
    }

    return null;
  }

  /**
   * Gets packages from server using an ODATA $filter string
   * @param {string} filter ODATA $filter string
   * @return {PackageRef[]}
   */
  async getAvailablePackagesByFilter(filter) {
    try {
      return await this.packageManager.sourceRepository.filterPackages(filter)
    }
    catch (e) {
      console.error(`could not filter '${filter}' (${e})`);
    }

    return null;
  }

}