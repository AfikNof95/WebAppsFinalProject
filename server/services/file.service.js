const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const FileService = {
  uploadImage(imageFile) {
    const fileName = `${imageFile.newFilename}.${mime.extension(imageFile.mimetype)}`;
    const filePath = path.join(process.env.rootDir, '/public/images/', fileName);
    return new Promise((resolve, reject) => {
      try {
        const rawData = fs.readFileSync(imageFile.filepath);
        fs.writeFile(filePath, rawData, (err) => {
          if (err) {
            return reject(err);
          }
          return resolve('http://localhost:2308/images/' + fileName);
        });
      } catch (ex) {
        return reject(ex);
      }
    });
  }
};

module.exports = FileService;
