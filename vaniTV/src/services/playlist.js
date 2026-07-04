const fs = require("fs");
const path = require("path");

const { loadPlaylist } = require("../parser/m3u");

let channels = [];

function loadChannels() {
    const playlistDir = path.join(process.cwd(), "playlists");

    channels = [];

    const files = fs.readdirSync(playlistDir)
        .filter(file => file.toLowerCase().endsWith(".m3u"));

    for (const file of files) {
        const fullPath = path.join(playlistDir, file);

        try {
            const list = loadPlaylist(fullPath);

            console.log(`Loaded ${list.length} channels from ${file}`);

            channels.push(...list);

        } catch (err) {
            console.error(`Cannot load ${file}: ${err.message}`);
        }
    }

    console.log(`Total channels: ${channels.length}`);
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