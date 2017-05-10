import xml2js from "xml2js"

const xml = {
  toJson: (xml) => {
    return new Promise((resolve, reject) => {
      xml2js.parseString(xml, (err, result) => {
        if (err) {
          reject(err)
        }
        else {
          resolve(result)
        }
      })
    })
  }
}

export default xml;