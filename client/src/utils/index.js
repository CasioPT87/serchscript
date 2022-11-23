const getFileExtension = filename => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

module.exports = {
    getFileExtension
}