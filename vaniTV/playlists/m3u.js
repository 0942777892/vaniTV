const fs = require("fs");
const { parse } = require("iptv-playlist-parser");

function loadPlaylist(path) {
    const content = fs.readFileSync(path, "utf8");

    const playlist = parse(content);

    return playlist.items;
}

module.exports = {
    loadPlaylist
};