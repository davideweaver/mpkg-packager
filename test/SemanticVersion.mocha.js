import assert from "assert"
import SemanticVersion from "../src/SemanticVersion"

describe("SemanticVersion", () => {

	describe("constructor", () => {

		it("should initialize all props", () => {
			let ver = new SemanticVersion("1.2.3.4");
			assert.equal(1, ver.major);
			assert.equal(2, ver.minor);
			assert.equal(3, ver.build);
			assert.equal(4, ver.revision);
		})

		it("should initialize partial props", () => {
			let ver = new SemanticVersion("1.2");
			assert.equal(1, ver.major);
			assert.equal(2, ver.minor);
			assert.equal(null, ver.build);
			assert.equal(null, ver.revision);
		})

		it("should initialize with param", () => {
			let ver = new SemanticVersion();
			assert.equal(0, ver.major);
			assert.equal(null, ver.minor);
			assert.equal(null, ver.build);
			assert.equal(null, ver.revision);
		})

		it("should initialize with partial param", () => {
			let ver = new SemanticVersion("1.");
			assert.equal(1, ver.major);
			assert.equal(null, ver.minor);
			assert.equal(null, ver.build);
			assert.equal(null, ver.revision);
		})

		it("should fail with garbage", () => {
			assert.throws(() => ver = new SemanticVersion("khskutyeisur"), Error, "Error thrown");
		})

		it("should fail with more garbage", () => {
			assert.throws(() => ver = new SemanticVersion("1.khskutyeisur"), Error, "Error thrown");
		})

	})

	describe("toString", () => {

		it("should mimic param", () => {
			let ver = new SemanticVersion("1.2.3.4");
			assert.equal("1.2.3.4", ver.toString());
		})

		it("should mimic partial param", () => {
			let ver = new SemanticVersion("1.2");
			assert.equal("1.2", ver.toString());
		})

	})

})

