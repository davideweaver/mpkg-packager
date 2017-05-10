import request from "request"
import requestPromise from "request-promise-native"
import fs from "fs"

const http = {
  request: body => {
    return requestPromise(body);
  },
  downloadFile: (uri, localFilePath) => {
    return new Promise((resolve, reject) => {

      var file = fs.createWriteStream(localFilePath);
      file.on("finish", () => { 
          file.close(() => {
            resolve(localFilePath)
          })
        });

      request
        .get(uri)
        .on("error", function(err) {
          reject(err)
        })
        .pipe(file)
    })
  }
}

export default http;