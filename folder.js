let getFiles = function(folder) {
    fs = require("fs");

    let files_folder = [];

    fs.readdirSync(folder).forEach(
        (file) => {
            files_folder.push(file);
        }
    );
    return files_folder;
}

module.exports.getFiles = getFiles;