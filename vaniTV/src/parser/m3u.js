const fs = require("fs");
const { parse } = require("iptv-playlist-parser");

function loadPlaylist(file) {

    const text = fs.readFileSync(file, "utf8");

    const playlist = parse(text);

    return playlist.items;

}

module.exports = {
    loadPlaylist
};