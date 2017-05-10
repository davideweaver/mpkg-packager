import Cacheman from "cacheman"

export default class DependencyCache {

  constructor() {
    this.cache = new Cacheman("dependencies", {
      engine: "file",
      tmpDir: "./packages/cache",
      ttl: (60 * 60 * 24 * 7 * 10) // 10 weeks
    });
  }

  async set(key, value) {
    return this.cache.set(key, value);
  }

  async get(key) {
    return this.cache.get(key);
  }
}