import "babel-polyfill"
import assert from "assert"
import sinon from "sinon"

import SemanticVersion from "../src/SemanticVersion"
import SourceRepository from "../src/SourceRepository"
import PackageManager from "../src/PackageManager"
import Packager from "../src/Packager"

describe("Packager", () => {

  var packager;
  var sourceRepository;
  var packageManager;
  var sandbox; 

  function setup() { 
    sourceRepository = new SourceRepository("server");

    packageManager = new PackageManager("server");
    packageManager.sourceRepository = sourceRepository;

    packager = new Packager("server");
    packager.packageManager = packageManager;

    sandbox = sinon.sandbox.create();
  }

  function cleanup() { sandbox.restore() }

	describe("constructor", () => {

		it("should initialize server", () => {
			let p = new Packager("server");
			assert.equal("server", p.packageServer);
		})

  })

  describe("getAvailablePackagesByFilter", () => {

    beforeEach(setup)
    afterEach(cleanup)

		it("should call filterPackages", async () => {
			
      sandbox.stub(sourceRepository, "filterPackages").callsFake(() => "mock");

      let result = await packager.getAvailablePackagesByFilter("filter")
			assert.equal("mock", result);
		})

  })

  describe("getLatestVersion", () => {

    beforeEach(setup)
    afterEach(cleanup)

    it("should return null if package not found", async () => {

      sandbox.stub(sourceRepository, "findPackage").returns(null);

      let result = await packager.getLatestVersion("id")
			assert.equal(null, result);
		})

    it("should return version if package found", async () => {

      sandbox.stub(sourceRepository, "findPackage").returns({
        version: {
          toString: () => "1.2.3.4"
        }
      });

      let result = await packager.getLatestVersion("id")
			assert.equal("1.2.3.4", result);
		})

  })

})

