const fs = require('fs');
const path = require('path');
const FileService = {
  async uploadImage(imageFile) {
    const filePath = path.join(process.env.rootDir, '/public/images', imageFile.name);
    return fs.writeFile(filePath, imageFile.buffer);
  }
};

module.exports = FileService;
