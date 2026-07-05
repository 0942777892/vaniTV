const fs = require("fs");
const path = require("path");

const config = require("../../config/app");
const playlists = require("../../config/playlists.json");

const { parsePlaylist } = require("../parser/m3u");
const { downloadText } = require("./downloader");

async function loadPlaylists() {

    const channels = [];

    for (const playlist of playlists) {

        if (!playlist.enabled) {
            continue;
        }

        try {

            let text;

            if (playlist.type === "file") {

                const file = path.join(
                    process.cwd(),
                    config.playlist.folder,
                    playlist.path
                );

                if (!fs.existsSync(file)) {

                    console.warn(`[Playlist] Missing: ${playlist.path}`);
                    continue;

                }

                text = fs.readFileSync(file, "utf8");

            }
            else if (playlist.type === "url") {

                text = await downloadText(playlist.path);

            }
            else {

                console.warn(`[Playlist] Unknown playlist type: ${playlist.type}`);
                continue;

            }

            const list = parsePlaylist(text, playlist);

            console.log(`Loaded ${list.length} channels from ${playlist.name}`);

            channels.push(...list);

        }
        catch (err) {

            console.error(`Cannot load ${playlist.name}:`, err);

        }

    }

    return channels;

}

module.exports = {
    loadPlaylists
};