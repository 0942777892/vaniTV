const path = require("path");

const { loadPlaylist } = require("../parser/m3u");

let channels = [];

function loadChannels() {

    const file = path.join(
        process.cwd(),
        "playlists",
        "kenh.m3u"
    );

    channels = loadPlaylist(file);

    console.log("Loaded", channels.length, "channels");

}

function getChannels() {
    return channels;
}

module.exports = {
    loadChannels,
    getChannels
};