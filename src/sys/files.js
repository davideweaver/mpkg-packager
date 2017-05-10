import fs from "fs"
import fsPromise from "async-file"

class Files {

  async read(path) {
    try {
      return await fsPromise.readTextFile(path);
    }
    catch (e) {
      throw `couldn't read file: ${path}, ${e}`;
    }
  }

  async delete(path) {
    try {
      return await fsPromise.delete(path);
    }
    catch (e) {
      throw `couldn't delete file/folder: ${path}, ${e}`;
    }
  }

  async exists(path) {
    try {
      return await fsPromise.exists(path);
    }
    catch (e) {
      throw `couldn't check file/folder existence: ${path}, ${e}`;
    }
  }

  async getFiles(path) {
    try {
      return await fsPromise.readdir(path);
    }
    catch (e) {
      throw `couldn't get files in folder: ${path}, ${e}`;
    }
  }

  async createFolder(path) {
    try {
      return await fsPromise.createDirectory(path);
    }
    catch (e) {
      throw `couldn't create folder: ${path}, ${e}`;
    }
  }

  createFolderSync(path) {
    try {
      if (!fs.existsSync(path))
        fs.mkdirSync(path);
    }
    catch (e) {
      throw `couldn't create folder: ${path}, ${e}`;
    }
  }
}

export default new Files();