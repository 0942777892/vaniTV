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

function getChannelById(id) {

    return channels.find(channel => {

        const base =
            channel.tvg?.id ||
            channel.tvgId ||
            channel.name ||
            "unknown";

        const channelId =
            "vanitv:" +
            base
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");

        return channelId === id;

    });

}

module.exports = {

    loadChannels,

    getChannels,

    getChannelById

};