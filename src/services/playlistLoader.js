const fs = require("fs");
const path = require("path");

const config = require("../../config/app");
const playlists = require("../../config/playlists.json");

const { parsePlaylist } = require("../parser/m3u");
const { downloadText } = require("./downloader");

async function loadPlaylists() {

    const channels = [];

    const folder = path.join(
        process.cwd(),
        config.playlist.folder
    );

    for (const playlist of playlists) {

        if (!playlist.enabled) {

            console.log(
                `[Playlist] Skipped (disabled): ${playlist.name}`
            );

            continue;

        }

        try {

            let text;

            switch (playlist.type) {

                case "file":

                    text = fs.readFileSync(
                        path.join(folder, playlist.path),
                        "utf8"
                    );

                    break;

                case "url":

                    text = await downloadText(playlist.path);

                    break;

                default:

                    console.warn(
                        `[Playlist] Unknown type: ${playlist.type}`
                    );

                    continue;

            }

            const list = parsePlaylist(text, {

                name: playlist.name,

                source: playlist.name,

                priority: playlist.priority || 0

            });

            console.log(
                `Loaded ${list.length} channels from ${playlist.name}`
            );

            channels.push(...list);

        }
        catch (err) {

            console.error(
                `[Playlist] Cannot load ${playlist.name}:`,
                err.message
            );

        }

    }

    return channels;

}

module.exports = {
    loadPlaylists
};