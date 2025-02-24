function logInfo(message) {
    const timestamp = new Date().toISOString();
    console.log(`\x1b[34m[INFO]\x1b[0m \x1b[32m[${timestamp}]\x1b[0m ${message}`); // Blue info, green timestamp
}

function logError(message) {
    const timestamp = new Date().toISOString();
    console.error(`\x1b[31m[ERROR] \x1b[32m[${timestamp}]\x1b[0m ${message}`); // Red color
}

module.exports = {
    logInfo,
    logError
};