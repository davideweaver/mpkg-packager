import http from "./sys/http"
import files from "./sys/files"
import Zip from "adm-zip"

import LocalRepository from "./LocalRepository"
import SourceRepository from "./SourceRepository"
import PackageRef from "./PackageRef"
import DependencyCache from "./DependencyCache"
import SemanticVersion from "./SemanticVersion"

export default class PackageManager {

  constructor(packageServer) {
    this.packageServer = packageServer;
    this.localPackagesPath = "./packages";
    this._ensureLocalPackages();

    this.localRepository = new LocalRepository(this.localPackagesPath);
    this.sourceRepository = new SourceRepository(packageServer);
    this.dependencyCache = new DependencyCache();
  }

  async installPackage(id, version, ignoreDependencies) {
    
    if (!ignoreDependencies) {
      await this._installPackageAndDependencies(id, version);
    }
    else {
      await this._installPackage(id, version);
    }
  }

  /**
   * Uninstall a package
   * @param {string} id id of package to remove 
   * @param {bool} [forceRemove] remove package even if it's a dependency (default=false)
   * @param {bool} [removeDependencies] remove package's dependencies (default=true)
   */
  async uninstallPackage(id, forceRemove, removeDependencies) {

    if (forceRemove === undefined) forceRemove = false;
    if (removeDependencies === undefined) removeDependencies = true;

    // see if we are a dependent
    if (!forceRemove && await this._isInstalledPackageDependent(id)) {
      console.log(`package ${id} was not removed because it's a dependent, try forceRemove`);
      return;
    }

    // see if the package is installed
    let path = `${this.localPackagesPath}/${id}`;
    if (await files.exists(path) == false) {
      console.log(`package ${id} was not removed because it's not installed`);
      return;
    }

    // should we remove dependencies
    if (removeDependencies) {
      await this._removePackageAndDependencies(id);
    }
    else {
      await this._removePackage(id);
    }

    await files.delete(path);
  }

  async updatePackage(id, ignoreDependencies, showPrerelease) {

    // for now we just delete the current one and install the new one
    // but at some point we need to walk the dependency list
    // and update them

    let oldPackage = await this.localRepository.findPackage(id);
    if (!oldPackage) {
      throw "the package to update is not installed"
    }

    let newPackage = this.sourceRepository.findPackage(id);
    if (newPackage && !oldPackage.version.equalTo(newPackage.Version)) {

      await this.uninstallPackage(id);
      await this.installPackage(id);
    }
  }

  async isInstalled(id, version) {
    const ver = version != null ? new SemanticVersion(version) : null;
    var installedPackage = await this.localRepository.findPackage(id);
    if (installedPackage != null) {
      if (ver != null && installedPackage.version.greaterOrEqualTo(ver)) {
        return true;	
      }
      else if (ver == null) {
        return true;
      }
    }
  }

  _ensureLocalPackages() {
    files.createFolderSync(this.localPackagesPath);
    files.createFolderSync(this.localPackagesPath + "/cache");
  }

  _getName(id, version) {
    if (version !== undefined)
      return id + "-" + version;
    return id;
  }

  async _downloadPackage(id, version, downloadPath) {
    console.log(`downloading package ${id}-${version}`)

    let uri = `http://${this.packageServer}/api/v2/package/${id}`;
    if (version !== undefined) {
      uri += "/" + version;
    }

    let path = await http.downloadFile(uri, downloadPath);
    if (await files.exists(path) == false) {
      throw "the package '${this._getName(id, version)}' could not be downloaded"
    }

    return path;
  }

  _extractPackage(path, destPath) {
    let zip = new Zip(path);
    zip.extractAllTo(destPath, true);
  }

  async _cleanupFile(path) {
    await files.delete(path);
  }

  /**
   * Reads a file from an .mpkg package (not installed)
   * @param {string} path path to .mpkg package file
   * @param {string} file name of file to read
   * @return {string} contents of file or null if file was not found
   */
  _readMpkgPackageFile(path, file) {
    try {
      let data = null;
      let zip = new Zip(path);
      let zipEntries = zip.getEntries();
      zipEntries.forEach(function(zipEntry) {
        //console.log(zipEntry.entryName);
        if (zipEntry.entryName == file) {
            data = zipEntry.getData().toString('utf8'); 
        }
      });
      return data;
    }
    catch (e) {
      throw `cannot read package for '${path}:${file}': ${e}`
    }
  }

  /**
   * Reads a file from an installed package
   * @param {string} id id of package
   * @param {string} file name of file to read
   * @return {string} contents of file or null if file was not found
   */
  async _readInstalledPackageFile(id, file) {
    try {
      let data = null;
      let installedPackage = await this.localRepository.findPackage(id);
      if (!installedPackage) {
        data = await files.read(`${this.localPackagesPath}/${id}/${file}`)
      }
      return data;
    }
    catch (e) {
      throw `cannot read installed package for '${id}:${file}': ${e}`
    }
  }

  async _getPackageDependencies(id, version) {
    try {
      // check cache
      let cacheKey = this._getName(id, version);
      let deps = await this.dependencyCache.get(cacheKey);
      // TODO dependency cache has issues because of no versions
      // just disable it until fixed
      if (true || !deps) {
        //console.log(`- dependency cache MISS: ${cacheKey}`)
        deps = [];
        let tmpPath = `${this.localPackagesPath}/tmp-${id}-${version}.mpkg`;
        let path = await this._downloadPackage(id, version, tmpPath);
        let mspec = this._readMpkgPackageFile(tmpPath, `${id}.mspec`);
        await this._cleanupFile(tmpPath);
        if (mspec) {
          deps = (await PackageRef.fromMspec(mspec)).dependencies;
          await this.dependencyCache.set(cacheKey, deps);
        }
      }
      //else console.log(`- dependency cache HIT: ${id}`)
      return deps;
    }
    catch (e) {
      throw `cannot get dependencies for '${this._getName(id, version)}': ${e}`
    }
  }

  async _getInstalledPackageDependencies(id) {
    try {
      let installedPackage = await this.localRepository.findPackage(id);
      if (!installedPackage) {
        return installedPackage.dependencies;
      }
      return [];
    }
    catch (e) {
      throw `cannot get dependencies for installed package '${this._getName(id, version)}': ${e}`
    }
  }

  async _installPackage(id, version) {
    console.log(`installing: ${this._getName(id, version)}`)

    if (version && await this.isInstalled(id, version)) {
      console.log(`- already installed`);
      return;
    }

    let tmpPath = `${this.localPackagesPath}/downloaded.mpkg`;
    let pkgPath = `${this.localPackagesPath}/${id}`;

    let path = await this._downloadPackage(id, version, tmpPath);
    this._extractPackage(path, pkgPath);
    await this._cleanupFile(tmpPath);
  }

  async _installPackageAndDependencies(id, version) {
    try {
      let deps = await this._getPackageDependencies(id, version);
      for (var i=0; i<deps.length; i++) {
        await this._installPackageAndDependencies(deps[i]);
      }
      await this._installPackage(id, version);
    }
    catch (e) {
      throw `cannot install dependencies for '${this._getName(id, version)}': ${e}`
    }
  }

  async _removePackage(id) {
    console.log(`removing: ${this._getName(id)}`)
    let path = `${this.localPackagesPath}/${id}`;
    await files.delete(path);
  }

  async _removePackageAndDependencies(id) {
    try {
      let installedPackage = await this.localRepository.findPackage(id);
      if (installedPackage) {
        let deps = installedPackage.dependencies;
        for (var i=0; i<deps.length; i++) {
          await this._removePackageAndDependencies(deps[i]);
        }
        await this._removePackage(id);
      }
    }
    catch (e) {
      throw `cannot remove dependencies for '${this._getName(id, version)}': ${e}`
    }
  }

  async _isInstalledPackageDependent(id) {
    try {
      // get all installed packages
      let installedPackages = await this.localRepository.getPackages();

      // loop through and check if our id is a dependent
      for (var i=0; i<installedPackages.length; i++) {
        if (installedPackages[i].dependencies.includes(id))
          return true;
      }
      return false;
    }
    catch (e) {
      throw `cannot check if package is dependent for '${id}': ${e}`
    }
  }
}