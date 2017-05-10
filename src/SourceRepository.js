import http from "./sys/http"

import PackageRepository from "./PackageRepository"
import PackageRef from "./PackageRef"

export default class SourceRepository extends PackageRepository {

  constructor(packageServer) {
    super();
    this.packageServer = packageServer;
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
    let uri = `http://${this.packageServer}/api/v2/Packages()?$filter=Id%20eq%20%27${id}%27%20and%20IsLatestVersion%20eq%20true`;
    if (version !== undefined) {
      uri = `http://${this.packageServer}/api/v2/Packages()?$filter=Id%20eq%20%27${id}%27%20and%20Version%20eq%20%27${version}%27`;
    }

    // call to server
    let result = await http.request({
      uri: uri,
      json: true
    })

    if (!result) {
      return null;
    }

    let feed = result.d.results[0]

    return await PackageRef.fromFeed(feed);
  }

  /**
   * Get packages using a keyword search
   * @param {string} [keywords] Keywords to search for
   * @param {bool} [latestOnly] Only get latestversions of packages (default=true)
   * @param {bool} [inclusive] Use and AND search on keywords instead of OR (default=true)
   * @return {PackageRef[]}
   */
  async searchPackages(keywords, latestOnly, inclusive) {
    if (keywords === undefined) keywords = "";
    if (inclusive === undefined) inclusive = true;
    if (latestOnly === undefined) latestOnly = true;

    let op = inclusive ? "and" : "or";
    let filter = "";
    let idterms = ""
    let words = keywords.split(" ");
    words.map(word => {
      if (idterms != "")
        idterms += ` ${op} `;
      if (word != "") {
        idterms += `substringof('${word}',Id)`
      }
    })

    let latest = latestOnly ? "true" : "false";

    filter = `IsLatestVersion eq ${latest}`

    if (idterms != "") {
      filter += ` and (${idterms})`
    }

    return await this.filterPackages(filter);

    let uri = `http://${this.packageServer}/api/v2/Packages()?${filter}`;
  }

  /**
   * Get packages using a filter string (odata $filter)
   * @param {string} filterString Filter string to use
   * @return {PackageRef[]}
   */
  async filterPackages(filterString) {
    if (filterString === undefined) filterString = "";

    let filter = `$filter=${filterString}`

    let uri = `http://${this.packageServer}/api/v2/Packages()?${filter}`;

    // call to server
    let result = await http.request({
      uri: uri,
      json: true
    })

    let feeds = result.d.results
    return Promise.all(feeds.map(async (feed) => await PackageRef.fromFeed(feed)));
  }
}